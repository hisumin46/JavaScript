// function name(param1, param2) {body.. return};
function printHello(message) {
  console.log(message);
}

// 파라미터
function chageName(obj) {
  obj.name = "sumin"
}

// default parameters
function defaultPar(message, from = "unknown") {

}
defaultPar("hi");

// local scope
let global = "ss"
function print() {
  let message = "hi"
  console.log(message)
  function print2() {
    console.log(message); // 접근 가능
    let childMessage = "hi";
  }
  console.log(childMessage); // 접근 불가
  // return undefined;
}

// 리턴 - ealry 리턴 
function returnFun() {
  if(user.point > 10) {
    return;
  }
  // 로직 작성
}

print() // 함수 선언 이전 호출 가능 - 자바스크립트가 자동으로 선언을 위로 올림
const print = function() {}; // 무명 함수

print(); // g호출

// 콜백함수
// 상황이 맞으면 전달된 함수를 불러
function random(an, y, n) {
  if (an === "love you") {
    y();
  } else {
    n();
  }
}

// 무명함수
const y = function() {console.log("yes");}

// 이름 함수
// 디버깅할때 함수 이름이 나오기 위해 쓰임
// 함수 안에서 함수자신을 호출할때 사용
const n = function print() {console.log("yes");}

// 화살표 함수
const simplePrint = (a,b) => {
  console.log("simplePrint");
  return a, b;
}

// iife
// 함수 선언과 동시에 호출
{function helle() {
  console.log("iife")
}} ();