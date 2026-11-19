/* 구름이와 이야기하기: 화면 동작
   대사는 script.js, 연락처는 shared/config.js 에 있습니다. 이 파일은 고치지 않아도 됩니다.
   고른 답은 어디에도 저장하거나 보내지 않습니다. 통계는 시작, 연습 시작·완료, 끝까지 온 횟수, 도움받기 버튼만 셉니다. */
(function () {
  var C = window.Common, CFG = window.SITE_CONFIG, D = window.CHAT;
  var BUILD = "20261119a";
  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var stage = document.getElementById("stage"), bar = document.getElementById("bar"), backB = document.getElementById("back");
  var hist = [], tok = 0, timers = [], raf = 0, practice = null;

  C.initFs();
  document.getElementById("foot").textContent = "화면 버전 " + BUILD;
  C.trackOnce("chat-start", "구름이와 이야기 · 시작");

  function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
  function stopAll() {
    timers.forEach(clearTimeout); timers = [];
    if (raf) cancelAnimationFrame(raf); raf = 0; practice = null;
  }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  /* 구름이 그림 */
  function mascot(cls) {
    var w = el("div", "gu " + (cls || "")); w.setAttribute("aria-hidden", "true");
    w.innerHTML = '<svg viewBox="0 0 120 84"><g class="gu-b"><ellipse cx="60" cy="56" rx="50" ry="22"/><circle cx="40" cy="42" r="22"/><circle cx="70" cy="34" r="27"/><circle cx="92" cy="48" r="16"/></g>' +
      '<g class="gu-e"><ellipse cx="50" cy="52" rx="3.4" ry="4"/><ellipse cx="72" cy="52" rx="3.4" ry="4"/></g>' +
      '<path class="gu-m" d="M56 60 Q61 64.5 66 60"/><circle class="gu-c" cx="41" cy="60" r="5"/><circle class="gu-c" cx="81" cy="60" r="5"/></svg>';
    return w;
  }

  /* 연락처 (애니메이션 없이 바로) */
  function contacts(order) {
    var all = CFG.CONTACTS.concat([CFG.EMERGENCY]), list = all;
    if (order) list = order.map(function (k) { return all.filter(function (c) { return c.key === k; })[0]; }).filter(Boolean);
    var ul = el("ul", "hc");
    list.forEach(function (c) {
      var li = el("li");
      li.appendChild(el("span", "hw", c.when));
      var row = el("span", "hr");
      if (c.key !== "emergency-119") row.appendChild(el("span", "hn", c.label));
      row.appendChild(el("span", "num", c.num));
      if (c.note) row.appendChild(el("span", "ht", c.note));
      li.appendChild(row); ul.appendChild(li);
    });
    C.linkNums(ul);
    return ul;
  }

  /* ---------- 장면 이동 ---------- */
  function go(id, pre) {
    if (!D.nodes[id]) id = D.start;
    hist.push({ id: id, pre: pre || [] });
    render(false);
  }
  function back() {
    if (hist.length < 2) return;
    hist.pop(); render(true);
  }
  backB.onclick = back;

  function render(instant) {
    stopAll();
    var my = ++tok, cur = hist[hist.length - 1], node = D.nodes[cur.id];
    document.body.setAttribute("data-bg", node.bg || "home");
    bar.style.width = Math.round(((node.step || 0) / (D.steps || 9)) * 100) + "%";
    backB.disabled = hist.length < 2;
    if (node.track) C.trackOnce("chat-" + node.track, "구름이와 이야기 · " + node.track);
    var old = stage.firstElementChild;
    function put() {
      if (my !== tok) return;
      stage.innerHTML = "";
      var scene = node.type === "practice" ? buildPractice(node, my) : buildTalk(node, cur.pre, instant, my);
      stage.appendChild(scene);
      window.scrollTo(0, 0);
    }
    if (old && !reduce && !instant) { old.classList.add("out"); later(put, 220); } else put();
  }

  /* ---------- 대화 장면 ---------- */
  function buildTalk(node, pre, instant, my) {
    var isHelp = node.type === "help";
    var lines = (pre || []).concat(node.lines || []);
    var scene = el("section", "scene talk" + (isHelp ? " is-help" : ""));
    var gu = mascot(); scene.appendChild(gu);
    var text = el("div", "text"); text.setAttribute("aria-live", "polite"); scene.appendChild(text);
    var helpBox = null;
    if (isHelp) { helpBox = contacts(node.order); scene.appendChild(helpBox); }
    var chs = el("div", "choices"); scene.appendChild(chs);
    if (node.note) scene.appendChild(el("p", "note", node.note));

    var i = 0, done = false;
    function addLine(t, anim) {
      var p = el("p", "line" + (anim ? " rise" : ""), t);
      text.appendChild(p);
    }
    function finish() {
      if (done) return; done = true;
      while (i < lines.length) addLine(lines[i++], false);
      text.classList.remove("going"); gu.classList.remove("talking");
      text.querySelectorAll(".line").forEach(function (x) { x.classList.remove("dim"); });
      if (instant || reduce || isHelp) showChoices(); else later(showChoices, 320);
    }
    function next() {
      if (my !== tok || done) return;
      if (i >= lines.length) { finish(); return; }
      text.querySelectorAll(".line").forEach(function (x) { x.classList.add("dim"); });
      var t = lines[i++]; addLine(t, true);
      var d = Math.min(2400, Math.max(900, 650 + t.length * 45));
      if (node.fast) d = Math.round(d * 0.6);
      later(next, i < lines.length ? d : 500);
    }
    function showChoices() {
      if (my !== tok) return;
      var list = node.choices || [];
      if (list.length > 5) chs.classList.add("grid");
      list.forEach(function (c, k) {
        var b;
        if (c.href) {
          b = el("a", "ch", c.t); b.href = c.href;
          var m = /\.\.\/(\w+)\//.exec(c.href);
          if (m) { b.setAttribute("data-go", m[1]); b.setAttribute("data-from", "chat-" + hist[hist.length - 1].id); }
        } else {
          b = el("button", "ch", c.t); b.type = "button";
          b.onclick = function () { pick(b, c); };
        }
        b.style.setProperty("--i", k);
        chs.appendChild(b);
      });
    }
    function pick(b, c) {
      if (chs.classList.contains("lock")) return;
      chs.classList.add("lock"); b.classList.add("picked");
      chs.querySelectorAll("button").forEach(function (x) { x.disabled = true; });
      later(function () { go(c.go, c.pre); }, reduce ? 0 : 260);
    }

    if (instant || reduce || isHelp) { finish(); }
    else {
      text.classList.add("going"); gu.classList.add("talking");
      /* 글을 누르면 남은 문장을 한 번에 보여 줍니다 */
      scene.addEventListener("click", function (e) {
        if (done || (e.target.closest && e.target.closest("a, button"))) return;
        timers.forEach(clearTimeout); timers = []; finish();
      });
      later(next, 250);
    }
    return scene;
  }

  /* ---------- 연습 장면 (한 문장씩, 쉼 원이 차오름) ---------- */
  function buildPractice(node, my) {
    var scene = el("section", "scene practice");
    scene.appendChild(mascot("calm"));
    var count = el("div", "pcount"); scene.appendChild(count);
    var text = el("div", "ptext"); text.setAttribute("role", "status"); text.setAttribute("aria-live", "polite"); scene.appendChild(text);
    var R = 52, CIRC = 2 * Math.PI * R;
    var ring = el("div", "ring"); ring.setAttribute("aria-hidden", "true");
    ring.innerHTML = '<svg viewBox="0 0 120 120"><circle class="rb" cx="60" cy="60" r="' + R + '"/><circle class="rf" cx="60" cy="60" r="' + R + '" stroke-dasharray="' + CIRC.toFixed(1) + '" stroke-dashoffset="' + CIRC.toFixed(1) + '" transform="rotate(-90 60 60)"/></svg><span class="rl">천천히</span>';
    scene.appendChild(ring);
    var acts = el("div", "pact");
    var pauseB = el("button", "btn", "잠시 멈춤"); pauseB.type = "button";
    var quitB = el("button", "btn", "그만할게요"); quitB.type = "button";
    acts.appendChild(pauseB); acts.appendChild(quitB); scene.appendChild(acts);
    var rf = ring.querySelector(".rf"), rl = ring.querySelector(".rl");

    var steps = node.steps || [], i = -1, elapsed = 0, readMs = 0, waitMs = 0, last = 0, paused = false;
    C.trackOnce("chat-practice-" + node.id + "-start", "구름이와 이야기 · 연습 시작 · " + node.id);

    function setText(t) {
      text.classList.add("fade");
      later(function () {
        text.innerHTML = "";
        t.split("\n").forEach(function (s) { text.appendChild(el("span", "pl", s)); });
        text.classList.remove("fade");
      }, reduce ? 0 : 280);
    }
    function nextStep() {
      i++;
      if (i >= steps.length) {
        C.trackOnce("chat-practice-" + node.id + "-done", "구름이와 이야기 · 연습 완료 · " + node.id);
        go(node.next); return;
      }
      var s = steps[i];
      count.textContent = (i + 1) + " / " + steps.length;
      readMs = Math.min(4200, Math.max(1600, 900 + s.t.length * 40));
      waitMs = (s.w || 5) * 1000; elapsed = 0;
      rf.setAttribute("stroke-dashoffset", CIRC.toFixed(1)); rl.textContent = "읽어 보세요";
      setText(s.t);
    }
    function tick(now) {
      if (my !== tok) return;
      var dt = Math.min(200, now - last); last = now;
      if (!paused) {
        elapsed += dt;
        if (elapsed > readMs) {
          var p = Math.min(1, (elapsed - readMs) / waitMs);
          rf.setAttribute("stroke-dashoffset", (CIRC * (1 - p)).toFixed(1));
          rl.textContent = Math.max(1, Math.ceil((waitMs - (elapsed - readMs)) / 1000)) + "초";
        }
        if (elapsed >= readMs + waitMs) { nextStep(); if (my !== tok) return; }
      }
      raf = requestAnimationFrame(tick);
    }
    function pause(on) {
      paused = on; pauseB.textContent = on ? "이어서 할게요" : "잠시 멈춤";
      scene.classList.toggle("paused", on);
    }
    pauseB.onclick = function () { pause(!paused); };
    quitB.onclick = function () { go(node.quit || "rest"); };

    practice = { pause: pause, isPaused: function () { return paused; } };
    later(function () { nextStep(); last = performance.now(); raf = requestAnimationFrame(tick); }, 200);
    return scene;
  }

  /* ---------- 도움받기 (어느 화면에서나, 바로) ---------- */
  var sheet = document.getElementById("sheet"), helpB = document.getElementById("helpBtn"), wasPaused = false;
  document.getElementById("sheet-list").appendChild(contacts());
  function openSheet() {
    if (practice) { wasPaused = practice.isPaused(); practice.pause(true); }
    sheet.hidden = false; document.body.classList.add("sheet-open");
    sheet.querySelector(".sheet-in").scrollTop = 0;
    try { document.getElementById("sheet-x").focus({ preventScroll: true }); } catch (e) { document.getElementById("sheet-x").focus(); }
    C.trackOnce("chat-help-sheet", "구름이와 이야기 · 도움받기 버튼");
  }
  function closeSheet() {
    sheet.hidden = true; document.body.classList.remove("sheet-open");
    if (practice && !wasPaused) practice.pause(false);
    helpB.focus();
  }
  helpB.onclick = openSheet;
  document.getElementById("sheet-x").onclick = closeSheet;
  sheet.addEventListener("click", function (e) { if (e.target === sheet) closeSheet(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sheet.hidden) closeSheet(); });

  /* 검토용: 주소 끝에 #장면이름 을 붙이면 그 장면부터 시작합니다 (예: chat/#space) */
  var jump = decodeURIComponent(location.hash.replace("#", ""));
  try { go(D.nodes[jump] ? jump : D.start); }
  catch (e) {
    if (window.console) console.error(e);
    stage.innerHTML = '<section class="scene"><p class="text">화면을 불러오지 못했어요. 새로고침(Ctrl+F5)을 해 주세요.</p></section>';
  }
})();
