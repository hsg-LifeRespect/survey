/* 숨쉼 일러스트 (모두 직접 그린 SVG). 색은 style.css의 클래스와 색 변수가 정합니다. */
window.Illus = (function () {
  var HEART = "M0 38 C-62 -6 -38 -62 0 -26 C38 -62 62 -6 0 38Z";
  var LEAF = "M0 0 C8 -12 26 -14 34 -4 C26 6 8 8 0 0Z";

  function cloud(x, y, s, amp, dur, delay) {
    return '<g class="cdrift" style="--amp:' + amp + "px;--t:" + dur + "s;animation-delay:-" + delay + 's"><g transform="translate(' + x + " " + y + ") scale(" + s + ')" class="cloudf"><ellipse cx="30" cy="22" rx="30" ry="12"/><circle cx="22" cy="14" r="13"/><circle cx="42" cy="10" r="16"/></g></g>';
  }
  function plant(x, y, s, flip, d) {
    return '<g transform="translate(' + x + " " + y + ") scale(" + (flip ? -s : s) + " " + s + ')"><g class="sway" style="--d:-' + d + 's">' +
      '<path class="stem" d="M0 0 C-4 -30 4 -60 0 -92"/>' +
      '<path class="leaf" transform="translate(-1 -30) rotate(-38)" d="' + LEAF + '"/>' +
      '<path class="leaf2" transform="translate(1 -48) rotate(-142) scale(.9)" d="' + LEAF + '"/>' +
      '<path class="leaf" transform="translate(1 -66) rotate(-40) scale(.8)" d="' + LEAF + '"/>' +
      '<path class="leaf2" transform="translate(0 -92) rotate(-90) scale(.8)" d="' + LEAF + '"/></g></g>';
  }
  function flower(x, y, h, r, cls, d) {
    var pet = "";
    for (var k = 0; k < 5; k++) {
      var a = k * 72 * Math.PI / 180;
      pet += '<circle cx="' + (Math.sin(a) * r * .62).toFixed(1) + '" cy="' + (-Math.cos(a) * r * .62).toFixed(1) + '" r="' + (r * .55).toFixed(1) + '" class="' + cls + '"/>';
    }
    return '<g transform="translate(' + x + " " + y + ')"><g class="sway" style="--d:-' + d + 's"><path class="stem" d="M0 0 C-3 ' + (-h * .4) + " 3 " + (-h * .7) + " 0 " + (-h) + '"/>' +
      '<g transform="translate(0 ' + (-h) + ')"><g class="pop" style="--d:' + (0.3 + d * 0.15).toFixed(2) + 's">' + pet + '<circle r="' + (r * .38).toFixed(1) + '" class="fcent"/></g></g></g></g>';
  }
  function defs(id) {
    return '<defs><linearGradient id="hg' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="hs1"/><stop offset="1" class="hs2"/></linearGradient></defs>';
  }
  function heartBody(id) {
    return '<path d="M0 -26 C0 -38 0 -46 0 -56" class="stem"/>' +
      '<path class="leaf" d="M0 -56 C-8 -70 -26 -70 -32 -62 C-24 -52 -8 -50 0 -56Z"/>' +
      '<path class="leaf2" d="M0 -56 C8 -72 26 -72 32 -64 C24 -54 8 -52 0 -56Z"/>' +
      '<path d="' + HEART + '" fill="url(#hg' + id + ')"/>' +
      '<ellipse cx="-24" cy="-14" rx="9" ry="5" transform="rotate(-35 -24 -14)" class="shine"/>';
  }
  function sparkles(x, y) {
    return '<g class="spk" transform="translate(' + x + " " + y + ')"><path class="tw" style="--d:0s" d="M0 0 L-10 -14"/><path class="tw" style="--d:.5s" d="M8 -4 L10 -20"/><path class="tw" style="--d:1s" d="M14 4 L28 -6"/></g>';
  }
  function miniHeart(x, y, s, d) {
    return '<g transform="translate(' + x + " " + y + ") scale(" + s + ')"><path class="fh" style="--d:' + d + 's" d="M0 38 C-62 -6 -38 -62 0 -26 C38 -62 62 -6 0 38Z"/></g>';
  }

  var hills = '<path class="h1" d="M0 250 C120 200 240 232 360 215 C500 196 620 236 760 204 L760 340 L0 340Z"/>' +
    '<path class="h2" d="M0 282 C140 240 262 276 400 256 C540 236 650 276 760 250 L760 340 L0 340Z"/>' +
    '<path class="h3" d="M0 314 C160 286 300 316 460 299 C600 285 700 311 760 297 L760 340 L0 340Z"/>';

  function hero() {
    return '<svg viewBox="0 0 760 340" role="img" aria-label="새싹이 돋은 하트와 꽃이 핀 언덕 그림">' + defs("H") +
      '<ellipse class="blob" cx="560" cy="150" rx="210" ry="128"/><ellipse class="blob" cx="170" cy="170" rx="140" ry="90" opacity=".4"/>' +
      '<circle class="halo" cx="640" cy="82" r="64"/><circle class="sunf" cx="640" cy="82" r="42"/>' +
      cloud(90, 60, 1.1, 22, 18, 3) + cloud(430, 38, .75, 18, 22, 9) + cloud(620, 150, .6, 14, 16, 6) +
      hills + plant(54, 322, 1.15, false, 1) + plant(112, 328, .8, true, 3) + plant(706, 324, 1.1, true, 2) + plant(650, 330, .75, false, 4) +
      flower(190, 322, 62, 12, "pet-a", 1) + flower(246, 328, 44, 9, "pet-b", 2) + flower(300, 326, 36, 8, "pet-c", 3) +
      flower(500, 324, 52, 10, "pet-b", 4) + flower(560, 318, 72, 13, "pet-a", 5) + flower(610, 328, 40, 9, "pet-c", 6) +
      '<ellipse class="gshadow" cx="380" cy="236" rx="52" ry="9"/>' +
      '<g transform="translate(380 150) scale(1.35)"><g class="bob">' + heartBody("H") + "</g></g>" + sparkles(446, 96) +
      miniHeart(300, 190, .16, 0) + miniHeart(470, 200, .12, 1.6) + miniHeart(520, 170, .1, 3.2) + "</svg>";
  }

  function sprout(id, extra) {
    return '<svg class="sproutheart ' + (extra || "") + '" viewBox="-70 -90 140 140" aria-hidden="true">' + defs(id) +
      '<ellipse class="gshadow" cx="0" cy="52" rx="34" ry="6"/><g class="bob">' + heartBody(id) + "</g>" +
      miniHeart(-52, 20, .1, 0) + miniHeart(54, 10, .09, 1.2) + miniHeart(40, 30, .07, 2.4) + "</svg>";
  }

  /* 호흡용 꽃 */
  function orb() {
    var pet = "", p2 = "", k;
    for (k = 0; k < 8; k++) pet += '<ellipse cx="0" cy="-50" rx="21" ry="40" transform="rotate(' + (k * 45) + ')" class="' + (k % 2 ? "op-b" : "op-a") + '"/>';
    for (k = 0; k < 8; k++) p2 += '<ellipse cx="0" cy="-34" rx="14" ry="26" transform="rotate(' + (k * 45 + 22.5) + ')" class="op-c"/>';
    return '<svg viewBox="-110 -110 220 220" aria-hidden="true"><defs><radialGradient id="halo"><stop offset="0" class="hl1"/><stop offset="1" class="hl2"/></radialGradient></defs>' +
      '<circle r="104" fill="url(#halo)"/><g class="petals">' + pet + '</g><g class="petals2">' + p2 + '</g><circle r="20" class="oc"/></svg>';
  }

  /* 진행 표시용 작은 꽃 */
  function flowerDot(state) {
    var pet = "";
    for (var k = 0; k < 5; k++) { var a = k * 72 * Math.PI / 180; pet += '<circle cx="' + (Math.sin(a) * 6.5).toFixed(1) + '" cy="' + (-Math.cos(a) * 6.5).toFixed(1) + '" r="5" class="p"/>'; }
    return '<svg class="fl ' + state + '" viewBox="-14 -14 28 28" aria-hidden="true">' + pet + '<circle r="3.6" class="c"/></svg>';
  }

  function garden() {
    return '<svg viewBox="0 0 760 120" aria-hidden="true" preserveAspectRatio="xMidYMax slice"><path class="h2" d="M0 70 C140 40 262 72 400 56 C540 40 650 72 760 50 L760 120 L0 120Z"/><path class="h3" d="M0 100 C160 78 300 102 460 90 C600 80 700 100 760 88 L760 120 L0 120Z"/>' +
      flower(80, 112, 34, 9, "pet-a", 1) + flower(150, 116, 24, 7, "pet-b", 2) + flower(330, 112, 30, 8, "pet-c", 3) + flower(430, 114, 38, 9, "pet-b", 4) + flower(620, 112, 32, 8, "pet-a", 5) + flower(690, 116, 22, 7, "pet-c", 6) + "</svg>";
  }


  /* 마음 카드 모서리 그림 */
  function motif(kind) {
    var b = "";
    if (kind === "emp") b = '<path class="stem" d="M50 42 C50 34 50 30 50 24"/><path class="leaf" d="M50 24 C45 14 34 14 30 20 C36 27 45 28 50 24Z"/><path class="leaf2" d="M50 24 C55 12 66 12 70 19 C64 27 55 28 50 24Z"/><path class="hflat" transform="translate(50 62) scale(.9)" d="' + HEART + '"/>';
    else if (kind === "cmf") b = '<circle class="sunf" cx="62" cy="38" r="22"/><g class="cloudf" transform="translate(14 44) scale(1.1)"><ellipse cx="30" cy="22" rx="30" ry="12"/><circle cx="22" cy="14" r="13"/><circle cx="42" cy="10" r="16"/></g>';
    else if (kind === "rest") { b = '<path class="stem" d="M50 96 C46 80 54 66 50 50"/><path class="leaf" transform="translate(49 82) rotate(-30)" d="' + LEAF + '"/><path class="leaf2" transform="translate(51 70) rotate(-150) scale(.9)" d="' + LEAF + '"/><g transform="translate(50 40)">'; for (var k = 0; k < 5; k++) { var a = k * 72 * Math.PI / 180; b += '<circle cx="' + (Math.sin(a) * 13).toFixed(1) + '" cy="' + (-Math.cos(a) * 13).toFixed(1) + '" r="11" class="pet-a"/>'; } b += '<circle r="8" class="fcent"/></g>'; }
    else b = '<path class="hflat2" transform="translate(38 58) scale(.75)" d="' + HEART + '"/><path class="hflat" transform="translate(64 50) scale(.75)" d="' + HEART + '"/>';
    return '<svg class="motif" viewBox="0 0 100 100" aria-hidden="true">' + b + "</svg>";
  }

  function icon(kind) {
    if (kind === "bloom") {
      var s = "";
      for (var k = 0; k < 6; k++) s += '<ellipse cx="0" cy="-13" rx="7" ry="12" transform="rotate(' + (k * 60) + ')" class="' + (k % 2 ? "op-b" : "op-a") + '"/>';
      return '<svg class="ic" viewBox="-30 -30 60 60" aria-hidden="true">' + s + '<circle r="6" class="oc"/></svg>';
    }
    if (kind === "heart") return '<svg class="ic" viewBox="-36 -42 72 72" aria-hidden="true"><path class="ic-b" transform="scale(.8)" d="' + HEART + '"/><path class="stem" style="stroke-width:3" d="M0 -22 L0 -34"/><path class="leaf" transform="translate(0 -34) rotate(-30) scale(.6)" d="' + LEAF + '"/></svg>';
    if (kind === "walk") return '<svg class="ic" viewBox="0 0 60 60" aria-hidden="true"><path d="M6 54 C16 34 34 54 40 30 C44 16 52 14 54 8" fill="none" class="ic-path"/><circle cx="14" cy="22" r="9" class="ic-t1"/><circle cx="46" cy="44" r="7" class="ic-t2"/></svg>';
    return '<svg class="ic" viewBox="0 0 60 60" aria-hidden="true"><rect x="5" y="9" width="50" height="34" rx="14" class="ic-a"/><path d="M16 42 L13 54 L28 43Z" class="ic-a"/><path transform="translate(30 26) scale(.27)" d="' + HEART + '" class="ic-b"/></svg>';
  }

  return { motif: motif, hero: hero, sprout: sprout, orb: orb, flowerDot: flowerDot, garden: garden, icon: icon };
})();
