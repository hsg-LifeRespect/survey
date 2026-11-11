/* ===== 두 사이트가 함께 쓰는 설정 (여기만 고치면 숨쉼에 모두 반영됩니다) =====
   구름마음(maeum/index.html)은 한 파일로 독립 동작하므로, 전화번호가 바뀌면 그 파일 안의 번호도 함께 고쳐 주세요. */
window.SITE_CONFIG = {
  /* GoatCounter 사이트 코드. 구름마음과 같은 코드를 쓰면 한 대시보드에서 두 사이트가 경로(/maeum/, /shim/)로 구분되어 보입니다.
     비워 두면 통계가 꺼지고 외부로 아무것도 보내지 않습니다. */
  GC_CODE: "hsg-liferespect",

  /* 상담 연락처. key는 통계 이벤트 이름에 쓰입니다. */
  CONTACTS: [
    { key: "suicide-109", num: "109", label: "자살예방상담전화", note: "24시간, 무료" },
    { key: "crisis-1577", num: "1577-0199", label: "정신건강위기상담전화", note: "24시간" },
    { key: "center", num: "033-345-9901", label: "횡성군 정신건강복지센터", note: "주간" }
  ],
  EMERGENCY: { key: "emergency-119", num: "119", label: "생명이 위험한 응급 상황에는" }
};
