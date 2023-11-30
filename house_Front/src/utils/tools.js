// 소숫점 잘라내기 기능
// 카카오 맵은 좌표를 소숫점 자리 6개까지 사용 가능
export const truncateDecimals = (number, digits) => {
  const power = Math.pow(10, digits);
  console.log(Math.trunc(number * power) / power);
  return Math.trunc(number * power) / power;
};

// 매물 카드 세개씩 출력하기
export const reformLists = (list) => {
  const result = [];
  for (let i = 0; i < list.length; i += 3) {
      result.push(list.slice(i, i + 3));
  }
  console.log("입력받은 카드여요", list);
  console.log("카드 세개씩 출력할건디요", result);
  return result;
};

// 숫자를 세 자리마다 쉼표를 추가하는 함수
export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
