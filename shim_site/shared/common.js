/* 숨쉼 공통 스크립트: 통계(GoatCounter), 글자 크기, 전화번호 링크, 사이트 간 이동 집계 */
(function () {
  var CFG = window.SITE_CONFIG;
  var C = window.Common = {};

  C.esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  /* ---- 통계: 방문 수와 버튼 횟수만. 답변이나 개인 정보는 보내지 않습니다. ---- */
  C.statsOn = !!CFG.GC_CODE;
  if (C.statsOn) {
    var s = document.createElement("script");
    s.async = true; s.src = "https://gc.zgo.at/count.js";
    s.setAttribute("data-goatcounter", "https://" + CFG.GC_CODE + ".goatcounter.com/count");
    document.head.appendChild(s);
  }
  C.track = function (path, title) {
    try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: path, title: title, event: true }); } catch (e) {}
  };
  var memo = {};
  C.once = function (key) {
    try { if (sessionStorage.getItem(key)) return false; sessionStorage.setItem(key, "1"); return true; }
    catch (e) { if (memo[key]) return false; memo[key] = 1; return true; }
  };
  C.trackOnce = function (key, title) { if (C.once(key)) C.track(key, title); };

  /* ---- 글자 크기 (구름마음과 같은 설정을 함께 씁니다) ---- */
  function setFs(v) {
    var r = document.documentElement;
    if (v === 0) r.removeAttribute("data-fs"); else r.setAttribute("data-fs", String(v));
    document.querySelectorAll(".fs button").forEach(function (b) { b.setAttribute("aria-pressed", String(Number(b.dataset.fs) === v)); });
  }
  C.fsHtml = '<div class="fs" role="group" aria-label="글자 크기">' +
    '<button type="button" class="s0" data-fs="0" aria-label="글자 보통">가</button>' +
    '<button type="button" class="s1" data-fs="1" aria-label="글자 크게">가</button>' +
    '<button type="button" class="s2" data-fs="2" aria-label="글자 아주 크게">가</button></div>';
  C.initFs = function () {
    var v = 0; try { v = Number(localStorage.getItem("fs")) || 0; } catch (e) {}
    setFs(v);
    document.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest(".fs button"); if (!b) return;
      var n = Number(b.dataset.fs); setFs(n); try { localStorage.setItem("fs", String(n)); } catch (x) {}
    });
  };

  /* ---- 연락처 ---- */
  C.crisisHtml = function () {
    var parts = CFG.CONTACTS.map(function (c) { return C.esc(c.label) + ' <span class="num">' + c.num + "</span> (" + C.esc(c.note) + ")"; });
    return '<div class="help-strip"><b>마음이 많이 힘들 때는 혼자 견디지 마세요.</b><br>' + parts.join(" · ") +
      '<br>' + C.esc(CFG.EMERGENCY.label) + ' <span class="num">' + CFG.EMERGENCY.num + "</span></div>";
  };
  var nameByDigits = {};
  CFG.CONTACTS.concat([CFG.EMERGENCY]).forEach(function (c) { nameByDigits[c.num.replace(/\D/g, "")] = c; });
  C.linkNums = function (root) {
    (root || document).querySelectorAll("span.num").forEach(function (el) {
      var a = document.createElement("a");
      a.className = "num"; a.href = "tel:" + el.textContent.replace(/\D/g, ""); a.textContent = el.textContent;
      el.replaceWith(a);
    });
  };

  /* 전화 버튼: 클릭, 전화 앱 열림(휴대폰만) 집계. 같은 방문에서 번호마다 한 번만 셉니다. */
  var coarse = !!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches), pending = null;
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a.num"); if (!a) return;
    var d = (a.getAttribute("href") || "").replace(/\D/g, ""), c = nameByDigits[d] || { key: "other", label: d };
    C.trackOnce("call-click-" + c.key + (coarse ? "-mobile" : "-pc"), "전화 버튼 클릭 · " + c.label + (coarse ? " · 휴대폰" : " · 컴퓨터"));
    if (coarse) pending = { c: c, t: Date.now() };
  });
  function opened() {
    var p = pending; pending = null;
    if (p && Date.now() - p.t <= 3000) C.trackOnce("call-open-" + p.c.key, "전화 앱 열림 · " + p.c.label);
  }
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") opened(); });
  window.addEventListener("pagehide", opened);

  /* 다른 사이트로 가는 링크: <a data-go="maeum" data-from="shim-home"> → 이벤트 go-maeum-from-shim-home */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-go]"); if (!a) return;
    var key = "go-" + a.getAttribute("data-go") + "-from-" + (a.getAttribute("data-from") || "x");
    C.trackOnce(key, "사이트 이동 · " + key);
  });
})();
