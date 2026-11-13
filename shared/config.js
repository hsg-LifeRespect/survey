/* ===== 모든 화면이 함께 쓰는 설정 =====
   구름마음(maeum), 숨쉼(shim), 처음 선택 화면이 모두 이 파일을 함께 씁니다. 번호는 여기 한 곳만 고치면 됩니다. */
window.SITE_CONFIG = {
  /* GoatCounter 사이트 코드. 구름마음과 같은 코드를 쓰면 한 대시보드에서 두 사이트가 경로(/maeum/, /shim/)로 구분되어 보입니다.
     비워 두면 통계가 꺼지고 외부로 아무것도 보내지 않습니다. */
  GC_CODE: "hsg-liferespect",

  /* 상담 연락처. key는 통계 이벤트 이름에 쓰입니다. when은 "이럴 때 이 번호" 설명입니다. */
  CONTACTS: [
    { key: "crisis-1577", num: "1577-0199", label: "정신건강위기상담전화", note: "24시간", when: "어느 지역이든, 마음 상담을 받고 싶다면" },
    { key: "suicide-109", num: "109", label: "자살예방상담전화", note: "24시간", when: "자살 생각 때문에 힘들어서 상담을 받고 싶다면" },
    { key: "center", num: "033-345-9901", label: "횡성군 정신건강복지센터", note: "주간", when: "횡성에 살고 있고, 빠르게 실제 도움을 받고 싶다면" }
  ],
  EMERGENCY: { key: "emergency-119", num: "119", label: "119", note: "", when: "생명이 위급한 상황이라면" }
};
