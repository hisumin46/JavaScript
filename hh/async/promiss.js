// 프로미스
// 객체 선언시 executor 콜백함수가 바로 네트워크 통신이 시작됨

const promise = new Promise((res, rej) => {
  // 데이터를 잘 읽어오면 resovle로 받아옴
  setTimeout(() => {
    // res('data');
    rej(new Error('no network'));
  }, 2000);
})

// consumers - then, catch, finally
// then은 다른 프로미스 호출도 가능
promise
  .then((val) => {
    // val는 res에서 받아온 'data' 를 말함
    // then은 수행이 잘 되다면 실행
    console.log(val); // data
  })
  .catch(err => {
    // 에러 처리
    console.log(err);
  })
  // 무조건 호출
  .finally(() => {
    console.log("finally");
  })


// 에러 핸들링
