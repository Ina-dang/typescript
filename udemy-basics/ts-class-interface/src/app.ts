//제네릭 타입 이해
// const names = ['Max', 'manuel'];
const names1: Array<string> = []; // string[]
const names2: Array<string | number> = []; // string | number[]
// names1[0].split(' ');

const promise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve('This is done!');
  }, 2000);
});

promise.then((data) => {
  data.split(' ');
});

// 제네릭 함수 생성하기

// 제네릭 하나만 쓰려면 T 입력
// function merge<T, U>(objA: T, objB: U) {
//   return Object.assign(objA, objB); //강의대로하면 자꾸 This type parameter might need an `extends {}` constraint.  오류가 남
// }

function merge<T extends object, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
const mergeObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergeObj.age);

interface Lengthy {
  length: number;
}

const countAndPrint = <T extends Lengthy>(element: T) => {
  let 설명 = '값이 없습니다.';
  if (element.length === 1) {
    설명 = '길이: 1';
  } else if (element.length > 0) {
    설명 = '길이: ' + element.length;
  }
  return [element, 설명];
};

console.log(countAndPrint(['Sport', 'Cook']));
