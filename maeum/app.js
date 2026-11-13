var FREQ4 = ["전혀 없었다", "며칠 동안 있었다", "일주일 이상 있었다", "거의 매일 있었다"];
var FREQ_NSS = ["전혀 그렇지 않다", "가끔 그렇다", "자주 그렇다", "거의 매일 그렇다"];
var FREQ6 = ["전혀 아니었다", "가끔 그랬다", "절반 이하로 그랬다", "절반 이상 그랬다", "대부분 그랬다", "항상 그랬다"];

var TESTS = {
  phq9: {
    tag: "우울", name: "마음 기분 점검", sub: "PHQ-9 기반", period: "지난 2주 동안, 다음과 같은 일이 얼마나 자주 있었나요?",
    desc: "가라앉은 기분, 흥미 저하, 수면과 식욕 변화 등 우울과 관련된 9가지 모습을 살펴봅니다.",
    opts: FREQ4, max: 27, minutes: 3,
    items: [
      "일에 흥미나 즐거움을 거의 느끼지 못했다",
      "기분이 가라앉거나 우울하거나 희망이 없다고 느꼈다",
      "잠들기 어렵거나, 자주 깨거나, 너무 많이 잤다",
      "피곤하고 기운이 없었다",
      "입맛이 없거나 반대로 너무 많이 먹었다",
      "내가 실패자 같거나, 나 자신이나 가족을 실망시켰다고 느꼈다",
      "신문을 읽거나 TV를 보는 일에 집중하기 어려웠다",
      "다른 사람이 알아챌 만큼 말과 행동이 느려졌거나, 반대로 가만히 있지 못하고 안절부절못했다",
      "차라리 죽는 게 낫겠다는 생각이나 스스로를 해치고 싶은 생각이 들었다"
    ],
    levels: [
      { to: 4, name: "거의 없음", text: "지금은 우울과 관련된 불편이 크지 않은 편입니다. 규칙적인 수면과 가벼운 산책, 사람들과의 대화처럼 평소 마음을 돌보는 습관을 이어 가세요." },
      { to: 9, name: "가벼운 수준", text: "가벼운 우울 증상이 있을 수 있습니다. 잠, 식사, 햇볕 쬐기 같은 생활 리듬을 먼저 살펴보고, 2주 뒤 다시 한번 점검해 보세요. 불편이 이어지면 상담을 권합니다." },
      { to: 14, name: "중간 수준", text: "일상에 영향을 줄 만한 우울 증상이 있을 수 있습니다. 가까운 정신건강복지센터나 의료기관에서 전문가와 이야기해 보시길 권합니다." },
      { to: 19, name: "다소 심한 수준", text: "우울 증상이 꽤 뚜렷합니다. 혼자 버티기보다 가까운 시일 안에 정신건강의학과 진료나 전문 상담을 받아 보세요." },
      { to: 27, name: "심한 수준", text: "우울 증상이 많이 심한 상태일 수 있습니다. 되도록 빨리 정신건강의학과 진료를 받아 보시길 강하게 권합니다. 주변 사람에게 지금 상태를 알리는 것도 큰 도움이 됩니다." }
    ],
    risk: 8
  },
  gad7: {
    tag: "불안", name: "마음 긴장 점검", sub: "GAD-7 기반", period: "지난 2주 동안, 다음과 같은 일이 얼마나 자주 있었나요?",
    desc: "초조함, 지나친 걱정, 쉬기 어려움 등 불안과 관련된 7가지 모습을 살펴봅니다.",
    opts: FREQ4, max: 21, minutes: 2,
    items: [
      "초조하거나 불안하거나 긴장되었다",
      "걱정을 멈추거나 조절하기 어려웠다",
      "여러 가지 일에 대해 지나치게 걱정했다",
      "편안하게 쉬기가 어려웠다",
      "너무 안절부절못해서 가만히 있기 힘들었다",
      "쉽게 짜증이 나거나 화가 났다",
      "끔찍한 일이 생길 것 같아 두려웠다"
    ],
    levels: [
      { to: 4, name: "거의 없음", text: "불안과 관련된 불편은 크지 않은 편입니다. 지금의 생활 리듬과 휴식 방법을 잘 유지해 주세요." },
      { to: 9, name: "가벼운 수준", text: "가벼운 불안이 있을 수 있습니다. 천천히 숨 쉬기, 스트레칭, 카페인 줄이기 같은 방법을 시도해 보고 2주 뒤 다시 점검해 보세요." },
      { to: 14, name: "중간 수준", text: "일상에 영향을 줄 수 있는 불안이 있을 수 있습니다. 지역 정신건강복지센터나 의료기관에서 상담해 보시길 권합니다." },
      { to: 21, name: "심한 수준", text: "불안 증상이 심한 상태일 수 있습니다. 가까운 시일 안에 정신건강의학과 진료나 전문 상담을 받아 보세요." }
    ]
  },
  who5: {
    tag: "안녕감", name: "마음 활력 점검", sub: "WHO-5 기반", period: "지난 2주 동안, 나는 이렇게 지냈다.",
    desc: "기분, 편안함, 활력, 숙면, 일상의 흥미를 5가지 문장으로 살펴봅니다. 마음이 얼마나 충전되어 있는지 보는 점검입니다.",
    opts: FREQ6, base: 0, max: 25, minutes: 1, percent: true,
    items: [
      "밝고 기분 좋게 지냈다",
      "차분하고 편안하게 지냈다",
      "활기차고 힘이 넘쳤다",
      "상쾌하고 푹 쉰 느낌으로 일어났다",
      "하루하루가 흥미로운 일들로 채워져 있었다"
    ],
    levels: [
      { to: 28, name: "많이 낮음", text: "마음의 활력이 많이 떨어져 있는 상태일 수 있습니다. 우울 점검도 함께 해 보시고, 가까운 전문가와 상담해 보시길 권합니다." },
      { to: 50, name: "낮은 편", text: "마음의 활력이 낮은 편입니다. 충분한 휴식과 즐거운 활동을 일부러 일정에 넣어 보고, 우울 점검도 함께 해 보세요." },
      { to: 76, name: "보통", text: "대체로 무난하게 지내고 있습니다. 활력을 더하는 활동이 무엇인지 찾아 꾸준히 이어 가 보세요." },
      { to: 100, name: "좋은 편", text: "마음이 잘 충전되어 있는 상태입니다. 지금의 좋은 습관을 이어 가세요." }
    ]
  },
  /* 한국인 스트레스 척도(NSS) 표준형 11문항. 보건복지부 한국인 정신건강 척도 사용자 지침서 표35, 점수 구분은 같은 지침서 4장 해석 기준 */
  nss: {
    tag: "스트레스", name: "마음 스트레스 점검", sub: "한국인 스트레스 척도 (NSS)", period: "최근 2주간, 각 문항에 해당하는 증상을 얼마나 자주 경험하였나요?",
    desc: "받고 있는 스트레스와 몸과 마음에 나타나는 반응 11가지를 살펴봅니다. 만 19~65세 성인 대상으로 검증된 도구입니다.",
    opts: FREQ_NSS, max: 33, minutes: 2,
    note: "이 도구는 만 19~65세 성인을 대상으로 검증되었습니다. 청소년과 65세 이상은 참고용으로만 봐 주세요.",
    items: [
      "스트레스를 많이 받는다",
      "변화에 적응하기 어렵다",
      "문제가 생기면 직접 처리할 자신이 없다",
      "머리가 아프다",
      "어지럽다",
      "소화가 안 된다",
      "가슴이 답답하다",
      "불안하고 초조하다",
      "쉽게 화가 난다",
      "쉽게 짜증이 난다",
      "뭘 자꾸 먹게 된다"
    ],
    levels: [
      { to: 10, name: "낮은 수준", text: "스트레스가 낮은 수준입니다. 지금의 휴식과 생활 리듬을 잘 이어 가세요." },
      { to: 20, name: "중등도 이상", text: "중등도 이상의 스트레스가 있을 수 있습니다. 11점 이상이면 정신건강의학과 등 전문가의 평가를 받아 보시길 권합니다." },
      { to: 33, name: "매우 높은 수준", text: "매우 높은 수준의 스트레스입니다. 21점 이상은 전문적인 평가가 반드시 필요한 상태로 해석할 수 있으니, 가까운 시일 안에 정신건강의학과나 정신건강복지센터를 이용해 주세요." }
    ]
  },
  /* 자살 행동 척도(SBQ-R) 4문항. 문항과 보기별 점수는 지침서 수록본 그대로이며, 문항마다 점수 배점이 달라 itemOpts의 pt로 합산합니다.
     기준은 총점 7점 이상. 점수 숫자와 "위험" 표현은 화면에 드러내지 않고, 결과와 관계없이 위기 연락처를 항상 보여 줍니다. */
  sbq: {
    tag: "마음 안전", name: "마음 안전 점검", sub: "자살 행동 척도 (SBQ-R)", period: "아래 질문에 가장 가까운 답을 골라 주세요.",
    desc: "힘든 마음에 대한 4가지 질문으로, 지금 도움이 필요한 신호가 있는지 살펴봅니다. 답하기 어려운 질문이 있을 수 있어요.",
    intro: "답하기 어려운 질문이 있을 수 있어요. 힘들면 언제든 멈추셔도 되고, 지금 힘들다면 화면 아래의 연락처로 바로 이야기할 수 있습니다.",
    minutes: 1, hideScore: true, moodFloor: 1, alwaysCrisis: true,
    minScore: 3, minName: "해당 신호 없음",
    minText: "모든 질문에 '없다'고 답하셨어요. 지금은 마음이 편안한 상태로 보여요. 그래도 힘든 일이 생기면 점수와 상관없이 언제든 이야기해도 괜찮습니다.",
    crisisTitle: "힘든 마음을 혼자 안고 있지 않아도 괜찮아요",
    items: [
      "자살을 하려고 생각해보거나 시도해 본 적이 있습니까?",
      "지난 일 년 동안 얼마나 자주 자살을 하려고 생각해 보았습니까?",
      "자살을 하려고 했거나 할지도 모른다는 말을 다른 사람에게 한 적이 있습니까?",
      "미래에 자살을 시도할 가능성이 얼마나 있다고 생각합니까?"
    ],
    itemOpts: [
      [
        { label: "전혀 없다", pt: 1 },
        { label: "잠시 생각해 본 적이 있다", pt: 2 },
        { label: "자살을 하려는 계획을 세워본 적은 있지만 실제로 시도는 하지 않았다 (정말로 죽고 싶었던 것은 아니다)", pt: 3 },
        { label: "자살을 하려는 계획을 세워본 적이 있고 (시도해 본 적은 없지만) 정말로 죽고 싶었다", pt: 3 },
        { label: "자살을 시도해 본 적이 있다. 하지만 죽고 싶었던 것은 아니다", pt: 4 },
        { label: "자살을 시도해 본 적이 있고, 정말로 죽고 싶었다", pt: 4 }
      ],
      [
        { label: "생각해 본 적이 전혀 없다", pt: 1 },
        { label: "드물지만 생각해 본 적이 있다 (1번)", pt: 2 },
        { label: "가끔 생각해 본 적이 있다 (2번)", pt: 3 },
        { label: "자주 생각해 보았다 (3~4번)", pt: 4 },
        { label: "매우 자주 생각해 보았다 (5번 이상)", pt: 5 }
      ],
      [
        { label: "아무에게도 말한 적이 없다", pt: 1 },
        { label: "한 번 있다. 그러나 정말로 죽고 싶었던 것은 아니다", pt: 2 },
        { label: "한 번 있다. 그때는 정말로 죽고 싶었다", pt: 2 },
        { label: "한 번 넘게 있다. 그러나 정말로 죽고 싶었던 것은 아니다", pt: 3 },
        { label: "한 번 넘게 있다. 그리고 정말로 죽고 싶었다", pt: 3 }
      ],
      [
        { label: "전혀 없다", pt: 0 },
        { label: "거의 없을 것 같다", pt: 1 },
        { label: "별로 없을 것 같다", pt: 2 },
        { label: "없을 것 같다", pt: 3 },
        { label: "있을 것 같다", pt: 4 },
        { label: "꽤 있을 것 같다", pt: 5 },
        { label: "아주 많이 있을 것 같다", pt: 6 }
      ]
    ],
    levels: [
      { to: 6, name: "기준 점수 미만", text: "이 검진의 기준 점수에는 미치지 않았습니다. 다만 이 검진만으로 안전하다고 말할 수는 없어요. 마음이 힘들다면 점수와 상관없이 언제든 이야기해도 괜찮습니다." },
      { to: 18, name: "도움이 필요한 신호", text: "자살과 관련된 생각이나 경험이 있을 수 있다는 신호입니다. 혼자 견디지 말고, 오늘 안에 가까운 사람이나 전문가에게 이야기해 보시길 강하게 권합니다. 지금 위험하다고 느껴지면 바로 아래 번호로 연락해 주세요." }
    ]
  }
};
var ORDER = ["phq9", "gad7", "nss", "who5", "sbq"];

/* 단계별 오늘 해 볼 일 (levels 순서와 같음) */
var ACTIONS = {
  phq9: [
    ["매일 비슷한 시간에 자고 일어나는 리듬을 이어 가세요", "하루 15분 정도 햇볕을 쬐며 걸어 보세요", "가까운 사람과 안부를 나누는 시간을 가져 보세요"],
    ["취침 전 화면 보는 시간을 줄여 보세요", "오늘 할 수 있는 작은 일 하나만 정해서 해 보세요", "2주 뒤 이 검진을 다시 해 보세요"],
    ["하루 중 가장 컨디션이 좋은 시간에 가벼운 산책을 해 보세요", "지금 느끼는 감정을 믿을 만한 사람에게 이야기해 보세요", "상담 예약을 이번 주 안에 해 보세요"],
    ["혼자 견디지 말고 가까운 사람에게 지금 상태를 알려 주세요", "정신건강의학과나 센터 상담을 가까운 날짜로 잡아 보세요", "잠과 식사를 최소한이라도 챙겨 보세요"],
    ["오늘 안에 가족이나 가까운 사람에게 힘든 상태를 알려 주세요", "아래 연락처로 전화해 상담을 받아 보세요", "되도록 빨리 정신건강의학과 진료를 받아 보세요"]
  ],
  gad7: [
    ["지금의 휴식 방법을 꾸준히 이어 가세요", "가벼운 운동이나 스트레칭을 생활에 넣어 보세요", "충분히 자고 규칙적으로 식사하세요"],
    ["천천히 숨을 4초 들이쉬고 6초 내쉬기를 다섯 번 해 보세요", "커피와 에너지 음료를 줄여 보세요", "걱정되는 일을 종이에 적어 보세요"],
    ["걱정이 클 때 몸을 먼저 풀어 주는 스트레칭을 해 보세요", "믿을 만한 사람에게 걱정을 이야기해 보세요", "센터나 의료기관 상담을 알아보세요"],
    ["혼자 견디지 말고 가까운 사람에게 상태를 알려 주세요", "가까운 시일 안에 상담이나 진료 예약을 잡아 보세요", "숨이 가쁘면 천천히 내쉬는 호흡부터 해 보세요"]
  ],
  sbq: [
    ["지금 힘든 일이 있다면 믿을 만한 사람에게 이야기해 보세요", "잠과 식사를 규칙적으로 챙겨 보세요", "필요할 때 언제든 아래 번호로 연락하세요"],
    ["오늘 안에 가족이나 가까운 사람에게 지금 마음을 이야기해 주세요", "아래 연락처로 지금 전화해서 상담을 받아 보세요", "혼자 있지 않도록 가까운 사람과 함께 있어 주세요"]
  ],
  nss: [
    ["지금의 휴식 방법을 꾸준히 이어 가세요", "가벼운 산책이나 스트레칭을 생활에 넣어 보세요", "충분히 자고 규칙적으로 식사하세요"],
    ["스트레스가 쌓이는 상황이 언제인지 적어 보세요", "천천히 숨을 4초 들이쉬고 6초 내쉬기를 다섯 번 해 보세요", "믿을 만한 사람에게 힘든 점을 이야기하고, 상담도 알아보세요"],
    ["혼자 견디지 말고 가까운 사람에게 지금 상태를 알려 주세요", "가까운 시일 안에 정신건강의학과나 센터 상담을 잡아 보세요", "잠과 식사를 최소한이라도 챙겨 보세요"]
  ],
  who5: [
    ["충분히 쉬고 몸을 따뜻하게 돌봐 주세요", "우울 검진도 함께 해 보세요", "상담을 받아 보시길 권합니다"],
    ["즐거웠던 활동 하나를 이번 주 일정에 넣어 보세요", "가볍게 걷고 햇볕을 쬐어 보세요", "우울 검진도 함께 해 보세요"],
    ["활력을 주는 활동이 무엇인지 적어 보세요", "규칙적인 수면과 식사를 이어 가세요", "주변 사람과 시간을 보내 보세요"],
    ["지금의 좋은 습관을 이어 가세요", "힘들어하는 주변 사람에게 안부를 물어 보세요", "한 달 뒤 다시 점검해 보세요"]
  ]
};

var linkNums = Common.linkNums; /* 전화번호 링크 (공통 파일) */

Common.initFs(); /* 글자 크기 (공통 파일) */

/* 통계(GoatCounter)는 공통 파일(shared/config.js의 GC_CODE)이 켭니다. 여기서는 안내 문구만 보여 줍니다. */
function loadStats() {
  if (!Common.statsOn) return;
  document.querySelectorAll(".stats-note").forEach(function (el) { el.hidden = false; });
  var p = document.createElement("p");
  p.textContent = "쿠키를 쓰지 않습니다. 답변과 점수는 통계로 보내지 않습니다.";
  var f = document.querySelector("footer");
  if (f) f.appendChild(p);
}

/* 통계 보내기, 전화 버튼 집계, 사이트 이동 집계는 모두 공통 파일(shared/common.js)이 처리합니다.
   여기서는 검진 완료 때 부르는 이름만 연결합니다. (보내는 것은 횟수뿐, 답변과 점수는 보내지 않습니다.) */
var track = Common.track, onceThisVisit = Common.once;

/* 상담 연락처는 shared/config.js 한 곳에서만 관리합니다. */
var CONTACTS = SITE_CONFIG.CONTACTS, EMERG = SITE_CONFIG.EMERGENCY;
function contactSpans() {
  return CONTACTS.map(function (c) { return '<span><em class="when">' + c.when + "</em>" + c.label + ' <span class="num">' + c.num + "</span> (" + c.note + ")</span>"; }).join("");
}
function emergencySpan() { return '<span><em class="when">' + EMERG.when + '</em><span class="num">' + EMERG.num + "</span></span>"; }
function contactRows() {
  return CONTACTS.map(function (c) { return '<div class="row"><span>' + c.when + "<small>" + c.label + " (" + c.note + ')</small></span><span class="num">' + c.num + "</span></div>"; }).join("");
}
function fillContacts() {
  var mini = document.getElementById("helpMini");
  if (mini) mini.innerHTML = "힘들면 언제든 멈추고 연락하세요 · " + CONTACTS.map(function (c) { return '<span class="num">' + c.num + "</span>" + (c.key === "center" ? " (센터, 주간)" : ""); }).join(" · ");
  var box = document.getElementById("crisisBox");
  if (box) box.innerHTML = "<b>지금 많이 힘들다면 혼자 견디지 마세요</b>" + contactSpans() + emergencySpan();
}

var app = document.getElementById("app");
var state = { id: null, i: 0, ans: [] };

function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }

function setMood(m) {
  var s = document.querySelector(".sky");
  if (m === null) s.removeAttribute("data-mood"); else s.setAttribute("data-mood", String(m));
}

var WEATHER = [
  { name: "맑음", text: "마음이 티 없이 맑은 날이에요." },
  { name: "구름 조금", text: "구름이 조금 껴 있어요. 잠깐 쉬어 가요." },
  { name: "흐림", text: "마음에 구름이 많이 낀 날이에요. 혼자 두지 마세요." },
  { name: "비", text: "비가 내리는 날이에요. 혼자 맞지 말고 도움의 우산을 함께 써요." }
];

function cloudG(x, y, s, amp, dur, delay) {
  return '<g class="drift" style="--amp:' + amp + "px;animation-duration:" + dur + "s;animation-delay:-" + delay + 's">' +
    '<g transform="translate(' + x + " " + y + ") scale(" + s + ')" class="sc-cloud"><ellipse cx="30" cy="22" rx="30" ry="12"/><circle cx="22" cy="14" r="13"/><circle cx="42" cy="10" r="16"/></g></g>';
}
function sunG(x, y, r, strong) {
  var rays = "";
  for (var a = 0; a < 8; a++) {
    var rad = a * Math.PI / 4, c = Math.cos(rad), d = Math.sin(rad);
    rays += '<line x1="' + (x + c * (r + 5)).toFixed(1) + '" y1="' + (y + d * (r + 5)).toFixed(1) + '" x2="' + (x + c * (r + 13)).toFixed(1) + '" y2="' + (y + d * (r + 13)).toFixed(1) + '" stroke="#ffc94d" stroke-width="3" stroke-linecap="round"/>';
  }
  return '<g class="sun' + (strong ? " strong" : "") + '"><circle class="halo" cx="' + x + '" cy="' + y + '" r="' + (r + 16) + '" fill="#ffc94d"/>' +
    '<g class="rays">' + rays + '</g><circle class="core" cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#ffc94d"/></g>';
}
/* 한우는 결과(날씨)마다 자리와 방향을 바꿉니다 */
function cowUse(x, w, flip) {
  var h = (w * 0.65).toFixed(1), y = (129 - h).toFixed(1);
  if (flip) return '<use href="#hanwoo" transform="translate(' + (x + w) + " " + y + ') scale(-1 1)" x="0" y="0" width="' + w + '" height="' + h + '"/>';
  return '<use href="#hanwoo" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"/>';
}
function sceneHtml(m) {
  var sky = "", rain = "", cow = "";
  if (m === 0) {
    sky = sunG(74, 46, 20, true) + cloudG(290, 24, 0.7, 18, 11, 0);
    cow = cowUse(210, 104, false);
  }
  if (m === 1) {
    sky = sunG(86, 42, 20, false) + cloudG(92, 46, 1, 10, 13, 4) + cloudG(300, 22, 0.6, 14, 11, 0);
    cow = cowUse(275, 96, false);
  }
  if (m === 2) {
    sky = cloudG(30, 16, 1.2, 22, 14, 0) + cloudG(150, 34, 1, 26, 16, 6) + cloudG(290, 12, 1.1, 20, 12, 3);
    cow = cowUse(120, 100, true);
  }
  if (m === 3) {
    sky = cloudG(30, 12, 1.3, 18, 12, 0) + cloudG(150, 28, 1.1, 22, 14, 5) + cloudG(285, 8, 1.2, 16, 10, 2);
    cow = cowUse(185, 100, false);
    rain = '<g class="rain">';
    for (var k = 0; k < 14; k++) {
      var x = 30 + k * 26;
      rain += '<line x1="' + x + '" y1="64" x2="' + (x - 4) + '" y2="76" style="animation-delay:' + ((k % 5) * 0.22).toFixed(2) + 's"/>';
    }
    rain += "</g>";
  }
  var w = WEATHER[m];
  return '<div class="weather m' + m + '"><svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
    sky + '<path d="M0 100 L60 74 L110 96 L170 62 L240 98 L300 70 L360 94 L400 80 L400 140 L0 140Z" fill="var(--ridge)"/>' +
    '<path d="M0 140 L0 112 C80 96 170 106 240 102 C310 98 360 106 400 100 L400 140Z" fill="var(--hill2)"/>' +
    cow + rain + "</svg>" +
    '<div class="wcap"><span class="wname">오늘 마음 날씨 · ' + w.name + '</span><span class="wtext">' + w.text + "</span></div></div>";
}

/* 첫 화면 오른쪽(휴대폰에서는 소개 아래)에 놓이는 횡성 목장 풍경 */
var HERO_SCENE = '<div class="hero-scene" aria-hidden="true"><svg viewBox="0 0 440 270" preserveAspectRatio="xMidYMid meet">' +
  '<path d="M0 150 L60 108 L120 140 L200 84 L280 134 L350 100 L440 138 L440 270 L0 270Z" fill="var(--ridge)"/>' +
  '<path d="M0 178 C100 138 200 168 300 150 C360 140 410 152 440 148 L440 270 L0 270Z" fill="var(--hill1)"/>' +
  '<path d="M0 212 C120 178 240 208 440 180 L440 270 L0 270Z" fill="var(--hill2)"/>' +
  '<path d="M0 242 C150 218 300 242 440 224 L440 270 L0 270Z" fill="var(--hill3)"/>' +
  '<use href="#hanwoo" x="40" y="148" width="130" height="84.5"/>' +
  '<use href="#hanwoo" transform="translate(342 170) scale(-1 1)" x="0" y="0" width="92" height="59.8"/>' +
  '<use href="#hanwoo" x="190" y="198" width="56" height="36.4"/>' +
  '<text x="220" y="262" text-anchor="middle" font-family="Gowun Dodum, Noto Sans KR, sans-serif" font-size="13" letter-spacing="0.6" fill="var(--fg)" opacity="0.72">산과 들, 한우의 고장 횡성</text>' +
  "</svg></div>";

function renderHome() {
  flowId++;
  clearTimeout(advTimer);
  document.body.classList.remove("quiz-mode", "result-mode");
  setMood(null);
  state = { id: null, i: 0, ans: [] };
  var cards = ORDER.map(function (id) {
    var t = TESTS[id];
    return '<button class="test-card" type="button" data-test="' + id + '">' +
      '<span class="tag">' + t.tag + " · " + t.sub + "</span>" +
      "<h2>" + t.name + "</h2><p>" + t.desc + "</p>" +
      '<span class="meta"><span>' + t.items.length + "문항 · 약 " + t.minutes + '분</span><span class="go">시작</span></span></button>';
  }).join("");
  app.innerHTML =
    '<div class="hero-band"><section class="hero"><p class="eyebrow">횡성 마음건강 자가검진</p>' +
    "<h1>구름처럼 가볍게,<br>내 마음을 살펴보세요</h1>" +
    "<p>몇 가지 질문에 답하면 요즘 마음 상태를 가늠할 수 있는 결과를 알려 드립니다.</p>" +
    '<div class="facts"><span>회원가입 없음</span><span>이름·연락처 입력 없음</span><span>1~3분 소요</span></div></section>' + HERO_SCENE + "</div>" +
    '<section class="tests" aria-label="검진 선택">' + cards + "</section>" +
    '<div class="notice"><p><b>이렇게 답해 주세요</b></p><p>생각을 오래 하기보다, 지난 2주 동안의 내 모습에 가장 가까운 답을 골라 주세요. 맞고 틀린 답은 없습니다.</p></div>';
  window.scrollTo(0, 0);
}

/* 진행 막대와 화면 전환 효과
   mode: "enter"(검진 시작, 패널이 떠오름) · "next"(다음 문항, 오른쪽에서 들어옴) · "back"(이전 문항, 왼쪽에서 들어옴) */
var shownPct = 0;
var flowId = 0;
var advTimer = null;
function renderQuestion(mode) {
  clearTimeout(advTimer);
  document.body.classList.remove("result-mode");
  document.body.classList.add("quiz-mode");
  var t = TESTS[state.id], n = t.items.length, sel = state.ans[state.i];
  var target = state.i / n * 100;
  var startPct = mode === "enter" ? 0 : shownPct;
  var stageCls = mode === "back" ? "qstage back" : mode === "next" ? "qstage" : "qstage still";
  var labels = t.itemOpts ? t.itemOpts[state.i].map(function (o) { return o.label; }) : t.opts;
  var opts = labels.map(function (label, v) {
    return '<button class="opt" type="button" data-v="' + v + '" aria-pressed="' + (sel === v) + '">' + esc(label) + "</button>";
  }).join("");
  app.innerHTML =
    '<section class="panel' + (mode === "enter" ? "" : " stay") + '" aria-live="polite"><div class="panel-head"><h2>' + t.name + '</h2><span class="count">' + (state.i + 1) + " / " + n + "</span></div>" +
    '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + n + '" aria-valuenow="' + state.i + '"><div style="width:' + startPct + '%"></div></div>' +
    '<div class="' + stageCls + '"><p class="period">' + t.period + "</p>" + (t.intro && state.i === 0 ? '<p class="note intro">' + t.intro + "</p>" : "") +
    '<p class="q">' + esc(t.items[state.i]) + "</p>" +
    '<div class="opts">' + opts + "</div></div>" +
    '<div class="nav"><button class="btn" type="button" id="prev">' + (state.i === 0 ? "처음으로" : "이전") + "</button>" +
    (state.i === n - 1 ? '<button class="btn primary" type="button" id="next"' + (sel === undefined ? " disabled" : "") + ">결과 보기</button>" : "") + "</div></section>";
  shownPct = target;
  if (startPct !== target) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var f = app.querySelector(".bar > div");
        if (f) f.style.width = target + "%";
      });
    });
  }
}

/* 보기를 고르면 화면을 다시 그리지 않고 표시와 진행 막대만 바꿉니다 */
function selectInPlace(v) {
  var t = TESTS[state.id], n = t.items.length;
  state.ans[state.i] = v;
  app.querySelectorAll(".opt").forEach(function (b) { b.setAttribute("aria-pressed", String(Number(b.dataset.v) === v)); });
  var nx = document.getElementById("next");
  if (nx) nx.disabled = false;
  var pct = (state.i + 1) / n * 100;
  var f = app.querySelector(".bar > div");
  if (f) f.style.width = pct + "%";
  var bar = app.querySelector(".bar");
  if (bar) bar.setAttribute("aria-valuenow", String(state.i + 1));
  shownPct = pct;
}

function goNext(my) {
  var st = app.querySelector(".qstage");
  if (st) st.classList.add("leaving");
  setTimeout(function () {
    if (my !== flowId) return;
    state.i++;
    renderQuestion("next");
  }, 150);
}

function renderResult() {
  clearTimeout(advTimer);
  document.body.classList.remove("quiz-mode");
  document.body.classList.add("result-mode");
  var t = TESTS[state.id];
  track("complete-" + state.id, t.name + " 검진 완료");
  var raw = state.ans.reduce(function (a, b, idx) { return a + (t.itemOpts ? t.itemOpts[idx][b].pt : b); }, 0);
  var shown = t.percent ? raw * 4 : raw;
  var lvIdx = 0;
  for (var k = 0; k < t.levels.length; k++) { if (shown <= t.levels[k].to) { lvIdx = k; break; } lvIdx = k; }
  var allClear = t.minScore !== undefined && raw === t.minScore;
  var lv = allClear ? { name: t.minName, text: t.minText } : t.levels[lvIdx];
  var unit = t.percent ? "/ 100" : "/ " + t.max;
  var segs = t.levels.map(function (_, j) { return '<div class="' + (j <= lvIdx ? "on" : "") + '"></div>'; }).join("");
  var labs = t.levels.map(function (l) { return "<span>" + l.name + "</span>"; }).join("");
  var risk = t.risk !== undefined && state.ans[t.risk] > 0;
  var concern = state.id === "who5" ? lvIdx <= 1 : lvIdx >= 1;
  var sev = state.id === "who5" ? t.levels.length - 1 - lvIdx : lvIdx;
  var mood = Math.round(sev / (t.levels.length - 1) * 3);
  if (risk) mood = Math.max(mood, 2);
  if (t.moodFloor !== undefined) mood = Math.max(mood, t.moodFloor);
  if (allClear) mood = 0;
  setMood(mood);
  var riskBox = (risk || t.alwaysCrisis) ?
    '<div class="crisis"><b>' + (t.crisisTitle || "마지막 문항에 응답하신 내용이 마음에 걸립니다") + '</b><span>죽고 싶거나 스스로를 해치고 싶은 생각이 든다면, 점수와 상관없이 지금 바로 누군가에게 알려 주세요.</span>' + contactSpans() + '' + emergencySpan() + '</div>' : "";
  var others = ORDER.filter(function (x) { return x !== state.id; }).map(function (x) {
    return '<button class="btn" type="button" data-test="' + x + '">' + TESTS[x].name + "</button>";
  }).join("");
  app.innerHTML =
    '<section class="panel"><div class="panel-head"><h2>' + t.name + ' 결과</h2><span class="count">' + t.sub + "</span></div>" + sceneHtml(mood) +
    '<div class="score-row">' + (t.hideScore ? "" : '<span class="score">' + shown + " <small>" + unit + "</small></span>") + '<span class="level">' + lv.name + "</span></div>" +
    '<div class="scale" aria-hidden="true">' + segs + '</div><div class="scale-labels" aria-hidden="true">' + labs + "</div>" +
    '<p class="advice">' + lv.text + "</p>" + (t.note ? '<p class="note">' + t.note + "</p>" : "") + riskBox +
    '<div class="todo"><h3>오늘 해 볼 일</h3><ul>' + ACTIONS[state.id][lvIdx].map(function (a) { return "<li>" + a + "</li>"; }).join("") + '</ul><p class="sister-link"><a data-go="shim" data-from="maeum-result" href="../shim/?ref=maeum-result">숨 고르기 1분 해 보기 →</a></p></div>' +
    '<div class="contact"><h3>' + (concern ? "전문가와 이야기해 보고 싶다면" : "필요할 때 언제든 이용하세요") + "</h3>" +
    "<p>번호를 누르면 바로 전화를 걸 수 있습니다.</p>" +
    contactRows() +
    '<div class="result-actions"><button class="btn primary" type="button" id="again">다시 하기</button><button class="btn" type="button" id="homeBtn">검진 목록</button>' + others + "</div></section>";
  linkNums();
  window.scrollTo(0, 0);
}

function start(id) {
  setMood(null);
  flowId++;
  state = { id: id, i: 0, ans: [] };
  renderQuestion("enter");
  window.scrollTo(0, 0);
}

app.addEventListener("click", function (e) {
  var el = e.target.closest("button");
  if (!el) return;
  if (el.dataset.test) { location.hash = el.dataset.test; return; }
  if (el.id === "again") { start(state.id); return; }
  if (el.id === "homeBtn") { location.hash = "home"; return; }
  if (!state.id) return;
  var n = TESTS[state.id].items.length;
  if (app.querySelector(".qstage.leaving")) return;
  if (el.classList.contains("opt")) {
    selectInPlace(Number(el.dataset.v));
    if (state.i !== n - 1) {
      var my = flowId;
      clearTimeout(advTimer);
      advTimer = setTimeout(function () { if (my === flowId) goNext(my); }, 260);
    }
  } else if (el.id === "next") {
    if (state.ans[state.i] === undefined) return;
    if (state.i === n - 1) renderResult(); else goNext(flowId);
  } else if (el.id === "prev") {
    if (state.i === 0) location.hash = "home"; else { state.i--; renderQuestion("back"); }
  }
});

document.getElementById("brand").addEventListener("click", function () {
  if (location.hash === "#home" || location.hash === "") renderHome(); else location.hash = "home";
});
function route() {
  var h = location.hash.replace("#", "");
  if (TESTS[h]) start(h); else renderHome();
}
window.addEventListener("hashchange", route);
fillContacts();
route();
loadStats();
linkNums();
