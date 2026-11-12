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

  var timer = null, wake = null, msgTimer = null, cardTimer = null, navTok = 0;
  function view(v) { document.body.setAttribute("data-view", v); }
  function cleanup() {
    document.onkeydown = null;
    clearInterval(timer); timer = null; clearInterval(msgTimer); msgTimer = null; clearTimeout(cardTimer); cardTimer = null;
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
      '<a class="card c-peach" style="--i:1" href="#cards">' + I.icon("heart") + '<span class="tagc">카드 ' + S.CARDS.length + '장 · 계속 넘겨 보기</span><h2>마음 카드</h2><p>공감이 되는 말, 도움이 되는 말이 카드로 계속 나와요. 마음에 드는 건 저장해 두세요.</p></a>' +
      '<a class="card c-blue" style="--i:2" href="#myth">' + I.icon("talk") + '<span class="tagc">OX 퀴즈 · ' + S.MYTHS.length + '문항</span><h2>마음 건강, 맞을까요?</h2><p>흔히 오해하는 마음 건강 이야기와 잘 몰랐던 이야기를 가볍게 확인해 보세요.</p></a>' +
      '<a class="card c-warm" style="--i:3" href="#walk">' + I.icon("walk") + '<span class="tagc">' + (S.WALKS.length ? "길 " + S.WALKS.length + "곳" : "준비 중") + '</span><h2>횡성 산책길</h2><p>걸으며 숨을 고르기 좋은 횡성의 길을 소개해요.</p></a></div>' +
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
      '<div class="qno">' + (mq.i + 1) + " / " + n + (q.adv ? ' <span class="adv">잘 모르는 이야기</span>' : "") + "</div>" +
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
            document.getElementById("rv").innerHTML = '<div class="reveal"><h3 class="' + (q.ok ? "t-ok" : "t-no") + '">' + (q.ok ? "사실이에요" : "오해예요") + "</h3><p>" + esc(q.a) + "</p>" + (q.src ? '<p class="src">참고: ' + esc(q.src) + "</p>" : "") + "</div>" +
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

  /* ---------- 마음 카드 ---------- */
  var SAVED_KEY = "shimSaved", memSaved = [];
  function getSaved() { try { return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"); } catch (e) { return memSaved; } }
  function setSaved(a) { memSaved = a; try { localStorage.setItem(SAVED_KEY, JSON.stringify(a)); } catch (e) {} }
  var deck = { cat: "all", queue: [], cur: -1, shown: 0, auto: false };
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function pool() {
    var sv = getSaved(), out = [];
    S.CARDS.forEach(function (c, i) { if (deck.cat === "all" || (deck.cat === "saved" ? sv.indexOf(i) >= 0 : c.k === deck.cat)) out.push(i); });
    return out;
  }
  function nextIdx() {
    if (!deck.queue.length) {
      deck.queue = shuffle(pool());
      if (deck.queue.length > 1 && deck.queue[deck.queue.length - 1] === deck.cur) deck.queue.unshift(deck.queue.pop()); /* 방금 본 카드가 바로 또 나오지 않게 */
    }
    return deck.queue.pop();
  }
  function cardHtml(i) {
    var c = S.CARDS[i], saved = getSaved().indexOf(i) >= 0;
    var help = c.help ? '<div class="chelp">' + window.SITE_CONFIG.CONTACTS.slice(0, 3).map(function (x) { return esc(x.label) + ' <span class="num">' + x.num + "</span>"; }).join(" · ") + "</div>" : "";
    return '<article class="ccard k-' + c.k + '" data-i="' + i + '"><span class="kind">' + esc(S.CARD_CATS[c.k]) + "</span>" +
      '<button type="button" class="save" aria-pressed="' + saved + '" aria-label="' + (saved ? "저장 취소" : "이 카드 저장") + '">' + (saved ? "♥" : "♡") + "</button>" +
      '<p class="ctext">' + esc(c.t) + "</p>" + help + I.motif(c.k) + "</article>";
  }
  function cardsView() {
    view("cards");
    C.trackOnce("cards-start", "마음 카드 시작");
    deck.queue = []; deck.cur = -1; deck.shown = 0;
    var chips = ["all", "emp", "cmf", "rest", "with", "saved"].map(function (k) {
      return '<button type="button" class="chip" data-c="' + k + '" aria-pressed="' + (k === deck.cat) + '">' + (k === "saved" ? "♥ 저장" : esc(S.CARD_CATS[k])) + "</button>";
    }).join("");
    show('<section class="panel">' + backLink() + "<h2>마음 카드</h2>" +
      '<p class="lead">마음에 와닿는 말을 천천히 읽어 보세요. 끝없이 이어져요.</p>' +
      '<div class="catchips" role="group" aria-label="카드 종류">' + chips + "</div>" +
      '<div class="deck" id="deck"></div><div class="vh" id="clive" aria-live="polite"></div>' +
      '<div class="deckbar"><button type="button" class="btn primary" id="cnext">다음 카드 →</button><button type="button" class="btn" id="cauto" aria-pressed="false">자동으로 넘기기</button></div>' +
      '<p class="deckhint">옆으로 밀거나 키보드 ← → 로도 넘길 수 있어요. 저장한 카드는 이 기기에만 남아요.</p></section>',
      function () {
        var dk = document.getElementById("deck"), live = document.getElementById("clive"), autoB = document.getElementById("cauto");
        function schedule() {
          clearTimeout(cardTimer); if (!deck.auto) return;
          var len = (S.CARDS[deck.cur] ? S.CARDS[deck.cur].t.length : 20);
          cardTimer = setTimeout(function () { if (!document.hidden) go(false); schedule(); }, 5000 + len * 90);
        }
        function go(manual, dirR) {
          var i = nextIdx(); var prev = dk.querySelector(".ccard");
          if (i === undefined) {
            dk.innerHTML = '<div class="empty">' + (deck.cat === "saved" ? "하트를 눌러 저장하면 여기서 다시 볼 수 있어요." : "카드가 없어요.") + "</div>"; deck.cur = -1; return;
          }
          deck.cur = i; deck.shown++;
          if (deck.shown === 5) C.trackOnce("cards-5", "마음 카드 5장 넘겨 봄");
          var tmp = document.createElement("div"); tmp.innerHTML = cardHtml(i); var el = tmp.firstChild; C.linkNums(el);
          var emp = dk.querySelector(".empty"); if (emp) emp.remove();
          if (prev) { if (reduce) prev.remove(); else { prev.classList.add(dirR ? "leave-r" : "leave-l"); setTimeout(function () { prev.remove(); }, 360); } }
          el.classList.add("enter"); dk.appendChild(el);
          if (manual) { live.textContent = S.CARDS[i].t; schedule(); }
        }
        document.getElementById("cnext").onclick = function () { go(true); };
        autoB.onclick = function () {
          deck.auto = !deck.auto; autoB.setAttribute("aria-pressed", String(deck.auto)); autoB.textContent = deck.auto ? "자동 넘김 끄기" : "자동으로 넘기기"; autoB.classList.toggle("primary", deck.auto);
          if (deck.auto) C.trackOnce("cards-auto", "마음 카드 자동 넘김 사용"); schedule();
        };
        app.querySelectorAll(".catchips .chip").forEach(function (b) {
          b.onclick = function () {
            deck.cat = b.dataset.c; deck.queue = [];
            app.querySelectorAll(".catchips .chip").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
            dk.innerHTML = ""; go(true);
          };
        });
        dk.addEventListener("click", function (e) {
          var sb = e.target.closest && e.target.closest(".save"); if (!sb) return;
          var i = Number(sb.closest(".ccard").dataset.i), a = getSaved(), at = a.indexOf(i);
          if (at >= 0) a.splice(at, 1); else { a.push(i); C.trackOnce("card-save", "마음 카드 저장 사용"); }
          setSaved(a); var on = a.indexOf(i) >= 0;
          sb.setAttribute("aria-pressed", String(on)); sb.textContent = on ? "♥" : "♡"; sb.setAttribute("aria-label", on ? "저장 취소" : "이 카드 저장");
        });
        var sx = null;
        dk.addEventListener("pointerdown", function (e) { sx = e.target.closest(".save, a") ? null : e.clientX; });
        dk.addEventListener("pointerup", function (e) { if (sx === null) return; var dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) go(true, dx > 0); });
        document.onkeydown = function (e) { if (location.hash === "#cards" && (e.key === "ArrowRight" || e.key === "ArrowLeft")) { e.preventDefault(); go(true, e.key === "ArrowLeft"); } };
        go(true);
      });
  }

  /* ---------- 횡성 산책길 (내용은 content.js의 WALKS에 채웁니다) ---------- */
  function walkHtml(w, i) {
    var meta = [w.area, w.distance, w.time].filter(Boolean).map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("") + (w.level ? '<span class="lv">' + esc(w.level) + "</span>" : "");
    var dl = [["이렇게 걸어 보세요", w.tip], ["가는 방법", w.how], ["주의할 점", w.caution]].filter(function (x) { return x[1]; })
      .map(function (x) { return "<dt>" + x[0] + "</dt><dd>" + esc(x[1]) + "</dd>"; }).join("");
    return '<article class="wcard" style="--i:' + i + '">' + (w.img ? '<img class="wimg" src="' + esc(w.img) + '" alt="' + esc(w.name) + ' 사진" loading="lazy">' : "") +
      '<div class="wbody"><h3>' + esc(w.name) + '</h3><div class="wmeta">' + meta + "</div>" +
      (w.tags && w.tags.length ? '<div class="wtags">' + w.tags.map(function (x) { return "#" + esc(x); }).join(" ") + "</div>" : "") +
      (w.intro ? '<p class="intro">' + esc(w.intro) + "</p>" : "") + (dl ? "<dl>" + dl + "</dl>" : "") +
      '<div class="actions">' + (w.map ? '<a class="btn" target="_blank" rel="noopener" data-walk="' + i + '" href="' + esc(w.map) + '">지도 보기</a>' : "") +
      '<a class="btn primary" href="#breath">걸으며 숨 고르기</a></div></div></article>';
  }
  function walkGhost() {
    return '<article class="wcard ghost"><div class="wimg">사진이 들어갈 자리</div><div class="wbody"><h3 class="ph">산책길 이름</h3>' +
      '<div class="wmeta"><span>읍·면</span><span>거리</span><span>걸리는 시간</span><span class="lv">난이도</span></div>' +
      '<div class="wtags">#분위기 #태그</div><p class="intro ph">이곳이 어떤 길인지 한두 문장으로 소개해요.</p>' +
      '<dl><dt>이렇게 걸어 보세요</dt><dd class="ph">걷는 방법이나 추천 코스</dd><dt>가는 방법</dt><dd class="ph">찾아가는 방법</dd><dt>주의할 점</dt><dd class="ph">미리 알아 두면 좋은 점</dd></dl>' +
      '<div class="actions"><span class="btn">지도 보기</span><span class="btn primary">걸으며 숨 고르기</span></div></div></article>';
  }
  function walkView() {
    view("walk");
    C.trackOnce("walk-open", "산책길 페이지 열람");
    show('<section class="panel">' + backLink() + "<h2>횡성 산책길</h2><p class=\"lead\">" + esc(S.WALK_INTRO) + "</p>" +
      (S.WALKS.length ? '<div class="walks">' + S.WALKS.map(walkHtml).join("") + "</div>"
        : '<div class="walks">' + walkGhost() + '</div><p class="wnote">' + esc(S.WALK_EMPTY) + "</p>") + "</section>",
      function () {
        app.querySelectorAll("a[data-walk]").forEach(function (a) {
          a.addEventListener("click", function () { C.trackOnce("walk-map-" + a.dataset.walk, "산책길 지도 열기 · " + (S.WALKS[a.dataset.walk] || {}).name); });
        });
      });
  }

  function route() {
    cleanup();
    var h = location.hash.replace("#", "");
    if (h === "breath") breathSetup(); else if (h === "myth") mythStart(); else if (h === "cards") cardsView(); else if (h === "walk") walkView(); else home();
  }
  window.addEventListener("hashchange", route);
  route();
})();
