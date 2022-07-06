// 1. 덧셈, 뺄셈, 곱셈, 나눗셈
const addtion = (a,b)  => a+b;
const subtraction = (a,b)  => a-b;
const division = (a,b)  => a/b;
const multiplication = (a,b)  => a*b;


// 2. 클래스가 있고 학생 성적이 50이상인 학생 성적만 출력하시오.
// 학생 성적을 역순으로 출력하시오.
class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
};

const students = [
  new Student('A', 29, true, 45),
  new Student('B', 28, false, 80),
  new Student('C', 30, true, 90),
  new Student('D', 40, false, 66),
  new Student('E', 18, true, 88)
];


const reversePrint = (students) => {
  let list = []
  for(let student of students) {
    if (student.score >= 50) {
      list.push(student.score)
    }
  }
  return list.sort();
};
console.log(reversePrint(students));




// 3. 리스트 만들고 [1,2,3]
// 1뒤에 50삽입하고
// 맨앞에 10삽입, 맨뒤에 20삽입
// 1, 50, 2, 3 해당하는 부분만 추출해서 list2 만들어 출력하기
let numList = [1,2,3];
numList.splice(1, 0, 50);
numList.unshift(10);
numList.push(20);
console.log(numList);

numList.pop();
numList.shift();
console.log(numList);





//4. rabbit을 정의하고
const rabbit = {
  name: 'tori',
  color: 'white',
  size: null,
  birthDte: new Date(),
  jump: function() {
      console.log(`${this.name} can jump!`); // 메소드는 json으로 변환 안됨
  },
};

// JSON으로 생성한 후 출력하시오.
// 다시 JSON을 파싱한 후 키와 값을 출력하시오.

json = JSON.stringify(rabbit);
jsonRabbit = JSON.parse(json);
console.log(json);
console.log(jsonRabbit);
