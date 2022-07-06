// 1. string concatenation

console.log('su' + 'min');
console.log('su' + 1);
console.log(`sdlfjkslf
slfkjsf
dfkdkd
${1+2}`);

let x  = 2;
let y = 3;
x+=y;

//  || (or),  && (and), ! (not)

// 이경우에는 
const val1 = true;
const val2 = 4<2;

// 이경우 val1이 true일때 바로 끝남
// 연산이 많이 들어가는 경우에는 뒤에 호출
console.log(`or ${val1 || val2 || check()}`);

// 이경우도 val1도 false이면 실행 안함
console.log(`and ${val1 && val2 && check()}`);


function chekc()  {
  for (let i = 0; i<10; i++) {
    console.log('11');
  }
  return true
};

// equality
const s1 = "5";
const s2 = 5;

console.log(s1 == s2); // true -> 타입 변경해서
console.log(s1 === s2); // fasle -> 타입신경써서 타입까지 검사

console.log(0 == false); // t
console.log(0 === false); // f
console.log('' == false); // t
console.log('' === false); // f
console.log(null == undefined); // t
console.log(null === undefined); // f

// if - ? 
const name = "sumin"
console.log(name === "sumin"?"true" : "false");

// do - while
// do 함수 블록부터 실행 후 while로 검사
let i =3;
do {
  console.log(${i});
  i --;
} while (i>);

/