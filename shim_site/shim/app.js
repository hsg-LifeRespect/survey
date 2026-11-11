(function () {
  var C = window.Common, S = window.SHIM, I = window.Illus;
  var app = document.getElementById("app"), esc = C.esc;
  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* 머리말·꼬리말 */
  document.getElementById("tools").innerHTML = C.fsHtml +
    '<a class="sw" data-go="maeum" data-from="shim-header" href="../maeum/?ref=shim-header">구름마음 검진</a>';
  C.initFs();
  document.getElementById("help").innerHTML = C.crisisHtml();
  document.getElementById("foot").innerHTML = "<p>" + esc(S.FOOT) + "</p>" +
    (C.statsOn ? "<p>방문 수와 버튼을 누른 횟수만 통계로 집계합니다(GoatCounter, 쿠키 없음). 이름, 연락처, 답변은 수집하지 않습니다. 글자 크기 설정은 이 기기에만 저장됩니다.</p>" : "");
  C.linkNums(document.getElementById("help"));

  /* 다른 사이트에서 넘어온 방문 집계 */
  try {
    var ref = (new URLSearchParams(location.search).get("ref") || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 30);
    if (ref) C.trackOnce("arrive-" + ref, "다른 사이트에서 도착 · " + ref);
  } catch (e) {}

  var timer = null, wake = null, msgTimer = null, navTok = 0;
  function view(v) { document.body.setAttribute("data-view", v); }
  function cleanup() {
    clearInterval(timer); timer = null; clearInterval(msgTimer); msgTimer = null;
    document.body.classList.remove("session-mode");
    try { if (wake) wake.release(); } catch (e) {} wake = null;
  }

  /* 부드러운 화면 전환: 기존 화면이 사라진 뒤 새 화면이 들어옵니다 */
  function show(html, bind, dir) {
    var tok = ++navTok, old = app.firstElementChild, cls = dir === "next" ? "next" : "up";
    function put() {
      if (tok !== navTok) return;
      app.innerHTML = html; C.linkNums(app);
      var p = app.firstElementChild; if (p) p.classList.add("in-" + cls);
      window.scrollTo(0, 0);
      if (bind) bind();
    }
    if (old && !reduce) { old.classList.add("out-" + cls); setTimeout(put, 200); } else put();
  }
  function backLink() { return '<a class="back" href="#">← 처음으로</a>'; }
  function maeumBtn(from, text) { return '<a class="btn" data-go="maeum" data-from="' + from + '" href="../maeum/?ref=' + from + '">' + text + "</a>"; }

  /* ---------- 처음 화면 ---------- */
  function home() {
    view("home");
    show(
      '<div class="in"><section class="hero"><div><h1>오늘도 수고 많으셨어요,<br><span class="hl">잠깐 쉬어 가요</span></h1>' +
      '<p class="lead">바쁜 하루 사이에 마음을 쉬게 하는 공간이에요. 이름이나 연락처 없이 바로 이용할 수 있어요.</p>' +
      '<div class="bubble" id="msg" aria-live="off"></div></div><div class="hero-art">' + I.hero() + "</div></section>" +
      '<div class="cards">' +
      '<a class="card c-green" style="--i:0" href="#breath">' + I.icon("bloom") + '<span class="tagc">1분부터</span><h2>호흡 가이드</h2><p>꽃이 활짝 폈다 오므라드는 걸 따라 천천히 숨 쉬어 보세요. 소리 없이 화면만 보면 돼요.</p></a>' +
      '<a class="card c-blue" style="--i:1" href="#myth">' + I.icon("talk") + '<span class="tagc">OX 퀴즈 · 8문항</span><h2>마음 건강, 맞을까요?</h2><p>흔히 오해하는 마음 건강 이야기를 가볍게 확인해 보세요.</p></a></div>' +
      '<div class="sisterbox"><div><b>내 마음 상태가 궁금하다면</b><span>우울·불안·스트레스를 살펴보는 익명 자가검진이에요.</span></div>' +
      maeumBtn("shim-home", "구름마음 검진 →") + "</div>" +
      '<div class="garden">' + I.garden() + "</div></div>",
      function () {
        var el = document.getElementById("msg"), i = 0;
        function set() {
          var m = S.MESSAGES[i % S.MESSAGES.length], t = esc(m.t), e = esc(m.em);
          el.innerHTML = "<span>" + t.replace(e, '<span class="hl">' + e + "</span>") + "</span>";
        }
        set();
        if (!reduce) msgTimer = setInterval(function () {
          el.classList.add("fade");
          setTimeout(function () { i++; set(); el.classList.remove("fade"); }, 500);
        }, 5500);
      });
  }

  /* ---------- 호흡 가이드 ---------- */
  var sel = { id: "rest", min: 1 };
  function preset(id) { return S.PRESETS.filter(function (x) { return x.id === id; })[0]; }
  function breathSetup(dir) {
    view("breath"); var p = preset(sel.id);
    show('<section class="panel">' + backLink() + "<h2>호흡 가이드</h2>" +
      '<p class="lead">지금 상황에 맞는 걸 골라 보세요.</p>' +
      '<div class="opts">' + S.PRESETS.map(function (x) {
        return '<button type="button" class="opt" data-p="' + x.id + '" aria-pressed="' + (x.id === sel.id) + '"><b>' + esc(x.name) + "</b> · " + esc(x.desc) + "<small>" + esc(x.pattern) + "</small></button>";
      }).join("") + "</div>" +
      '<div class="label">시간</div><div class="chips">' + [1, 3, 5].map(function (m) {
        return '<button type="button" class="chip" data-m="' + m + '" aria-pressed="' + (m === sel.min) + '">' + m + "분</button>";
      }).join("") + "</div>" +
      '<ul class="ready">' + S.BREATH_READY.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
      '<p class="safe">' + esc(S.BREATH_SAFE) + "</p>" +
      '<div class="actions"><button type="button" class="btn primary" id="go">시작하기</button></div></section>',
      function () {
        app.querySelectorAll(".opt").forEach(function (b) {
          b.onclick = function () {
            sel.id = b.dataset.p; sel.min = preset(sel.id).min;
            app.querySelectorAll(".opt").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
            app.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-pressed", String(Number(x.dataset.m) === sel.min)); });
          };
        });
        app.querySelectorAll(".chip").forEach(function (b) {
          b.onclick = function () {
            sel.min = Number(b.dataset.m);
            app.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
          };
        });
        document.getElementById("go").onclick = function () { session(preset(sel.id), sel.min * 60); };
      }, dir);
  }

  function session(p, totalSec) {
    var cycle = p.inS + p.holdS + p.outS, total = Math.max(1, Math.round(totalSec / cycle)) * cycle;
    C.trackOnce("breath-start-" + p.id, "호흡 가이드 시작 · " + p.name);
    view("session");
    var petals = ""; for (var k = 0; k < 7; k++) petals += '<span class="pf" style="left:' + (8 + k * 13) + '%;animation-delay:-' + (k * 1.7).toFixed(1) + 's;animation-duration:' + (10 + (k % 3) * 2) + 's"></span>';
    show('<section class="panel stage">' + petals + '<div class="orbwrap"><div class="orb" id="orb">' + I.orb() + "</div></div>" +
      '<div class="phase" id="phase" role="status">곧 시작해요</div><div class="count" id="cnt" aria-hidden="true"></div>' +
      '<div class="bar" aria-hidden="true"><i id="bar"></i></div><div class="left" id="left"></div>' +
      '<div class="actions"><button type="button" class="btn" id="pause">잠깐 멈춤</button><button type="button" class="btn" id="quit">그만하기</button></div></section>',
      function () {
        document.body.classList.add("session-mode");
        try { if (navigator.wakeLock) navigator.wakeLock.request("screen").then(function (w) { wake = w; }, function () {}); } catch (e) {}
        var orb = document.getElementById("orb"), phaseEl = document.getElementById("phase"), cnt = document.getElementById("cnt"),
            bar = document.getElementById("bar"), left = document.getElementById("left"), pauseB = document.getElementById("pause");
        var elapsed = 0, last = performance.now(), paused = false, cur = "";
        function pause(on) { paused = on; last = performance.now(); pauseB.textContent = on ? "이어서 하기" : "잠깐 멈춤"; if (on) phaseEl.textContent = "멈춘 상태예요"; else cur = ""; }
        pauseB.onclick = function () { pause(!paused); };
        document.getElementById("quit").onclick = function () { cleanup(); breathSetup(); };
        document.addEventListener("visibilitychange", function h() {
          if (!timer) { document.removeEventListener("visibilitychange", h); return; }
          if (document.visibilityState === "hidden" && !paused) pause(true);
        });
        function tick() {
          var now = performance.now(); if (paused) return;
          elapsed += Math.min(now - last, 500); last = now;
          var t = elapsed / 1000;
          if (t >= total) { finish(p); return; }
          var c = t % cycle, ph, rem;
          if (c < p.inS) { ph = "in"; rem = p.inS - c; }
          else if (c < p.inS + p.holdS) { ph = "hold"; rem = p.inS + p.holdS - c; }
          else { ph = "out"; rem = cycle - c; }
          if (ph !== cur) {
            cur = ph;
            phaseEl.textContent = { in: "들이쉬세요", hold: "잠시 멈춰요", out: "내쉬세요" }[ph];
            orb.style.setProperty("--d", (ph === "in" ? p.inS : p.outS) + "s");
            orb.className = "orb " + ph;
          }
          cnt.textContent = Math.ceil(rem);
          bar.style.width = (t / total * 100) + "%";
          var r = Math.ceil(total - t); left.textContent = "남은 시간 " + Math.floor(r / 60) + ":" + ("0" + (r % 60)).slice(-2);
        }
        timer = setInterval(tick, 100);
      });
  }

  function finish(p) {
    cleanup(); view("breath");
    C.trackOnce("breath-complete-" + p.id, "호흡 가이드 완료 · " + p.name);
    show('<section class="panel done">' + I.sprout("B") + "<h2>수고하셨어요</h2><p class=\"lead\">" + esc(S.BREATH_DONE) + "</p>" +
      '<div class="actions"><button type="button" class="btn primary" id="again">한 번 더</button><a class="btn" href="#myth">OX 퀴즈 해 보기</a>' +
      maeumBtn("shim-breath-done", "내 마음 검진해 보기") + "</div></section>",
      function () { document.getElementById("again").onclick = function () { breathSetup(); }; });
  }

  /* ---------- 마음 건강, 맞을까요? ---------- */
  var mq = { i: 0, right: 0 };
  function mythStart() { mq = { i: 0, right: 0 }; C.trackOnce("myth-start", "OX 퀴즈 시작"); mythQ("up"); }
  function mythQ(dir) {
    view("myth");
    var q = S.MYTHS[mq.i], n = S.MYTHS.length, fl = "";
    for (var k = 0; k < n; k++) fl += I.flowerDot(k < mq.i ? (k === mq.i - 1 && dir === "next" ? "done fresh" : "done") : (k === mq.i ? "now" : ""));
    show('<section class="panel">' + backLink() + '<div class="fl-row" aria-hidden="true">' + fl + "</div>" +
      '<div class="qno">' + (mq.i + 1) + " / " + n + "</div>" +
      '<p class="qtext">' + esc(q.q) + "</p>" +
      '<div class="ox"><button type="button" data-v="1" aria-label="맞는 말이에요"><b>O</b>맞는 말</button><button type="button" data-v="0" aria-label="틀린 말이에요"><b>X</b>틀린 말</button></div>' +
      '<div id="rv"></div></section>',
      function () {
        var btns = app.querySelectorAll(".ox button");
        btns.forEach(function (b) {
          b.onclick = function () {
            var said = b.dataset.v === "1";
            if (said === q.ok) mq.right++;
            btns.forEach(function (x) { x.disabled = true; });
            b.classList.add("pick");
            var last = mq.i === n - 1;
            document.getElementById("rv").innerHTML = '<div class="reveal"><h3 class="' + (q.ok ? "t-ok" : "t-no") + '">' + (q.ok ? "사실이에요" : "오해예요") + "</h3><p>" + esc(q.a) + "</p></div>" +
              '<div class="actions"><button type="button" class="btn primary" id="nx">' + (last ? "결과 보기" : "다음") + "</button></div>";
            C.linkNums(document.getElementById("rv"));
            var nx = document.getElementById("nx"); nx.focus();
            nx.onclick = function () { mq.i++; if (mq.i >= n) mythDone(); else mythQ("next"); };
          };
        });
      }, dir);
  }
  function mythDone() {
    C.trackOnce("myth-complete", "OX 퀴즈 완료"); view("myth");
    show('<section class="panel done">' + I.sprout("M") + "<h2>끝까지 해 주셨어요</h2><div class=\"big\">" + mq.right + " / " + S.MYTHS.length + "</div>" +
      '<p class="lead">' + esc(S.MYTH_DONE_NOTE) + "</p>" +
      '<div class="actions"><a class="btn primary" href="#breath">숨 고르러 가기</a><button type="button" class="btn" id="re">다시 해 보기</button>' +
      maeumBtn("shim-myth-done", "내 마음 검진해 보기") + "</div></section>",
      function () { document.getElementById("re").onclick = mythStart; }, "next");
  }

  function route() {
    cleanup();
    var h = location.hash.replace("#", "");
    if (h === "breath") breathSetup(); else if (h === "myth") mythStart(); else home();
  }
  window.addEventListener("hashchange", route);
  route();
})();
