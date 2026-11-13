폴더 구성
  index.html      -> 처음 선택 화면 (구름마음 / 숨쉼 중 고르기)
  maeum/          -> 구름마음 자가검진 (index.html + style.css + app.js)
  shim/           -> 숨쉼 (index.html + style.css + app.js + content.js)
  shared/         -> 공통 파일
                     config.js  통계 코드와 상담 전화번호 (번호는 여기 한 곳만 고치면 모든 화면에 반영)
                     common.js  통계 보내기, 전화 버튼 집계, 글자 크기, 사이트 이동 집계
                     common.css / illus.js / logo.png

올리는 법: 이 폴더 안의 파일과 폴더를 통째로 GitHub 저장소 최상위에 올립니다.
  주소: .../ (선택 화면) · .../maeum/ · .../shim/

글 수정
  숨쉼 글 전체       shim/content.js (CARDS 마음 카드, MYTHS 퀴즈, WALKS 산책길)
  구름마음 문항 글    maeum/app.js 위쪽
