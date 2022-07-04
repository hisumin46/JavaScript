'use strict';

// 자바스크립트는 동기적인 언어
// 호이스팅이 된 이후로부터 작성 순서로부터 실행이됨
// var, function description 이 자동으로 선언을 위로 올림
console.log('1'); // 동기
setTimeout(() => { // 비동기
  // 호출 시 응답을 기다리지않고 다음 로직을 실행함 - 비동기
  // 나중에 불러줘 ! -> 콜백함수
  console.log('2'); 
}, 1000);
console.log('3'); // 동기

// 동기 콜백
// 함수의 선언은 호이스팅됨
function printImmdiately(print) {
  print();
};
printImmdiately(() => console.log("hi")); // 동기


// 비동기 콜백
function printWithDelay(print, timout) { 
  setTimeout(print, timout);
}
printWithDelay(() => console.log("async"), 2000); // 비동기

//1, 3, 2, hi, async


// 콜백지옥
class UserStorage{
  loginUser(id, pw, success, err) {
    setTimeout(() => {
      if ((id ==="sumin" && pw ==="1234")) {
        success(id);
      } else {
        err(new Error('not found'))
      }
    }, 2000);
  };

  getRoles(user, success, err) {
    setTimeout(() => {
      if (user ==="sumin") {
        success({name:"sumin", role:"admin"});
      } else {
        err(new Error('not success'))
      }
    }, 2000);
  }
}

// 가독성이 떨어짐
// 실행되고 실행되고 실행되고하는 콜백 지옥
const userStorage = new UserStorage();
const id = prompt('id');
const pw = prompt('pw');
userStorage.loginUser(id, pw, (user) => {
  userStorage.getRoles(user, (userWithRole) => {
    alert(userWithRole.name, userWithRole.role);
  }, (err) => {
    err => console.log(err);
  })
}, (err) =>{
  err => {console.log(err);}
})