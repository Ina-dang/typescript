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

//화살표함수
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

// keyof 제약조건 => key값을 넘겨줄 때 사용한다. 타입의 키 값들을 유니온 타입으로 반환
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  console.log(obj, key);
  return 'Value: ' + obj[key];
}
const EAC = extractAndConvert({ name: 'Max' }, 'name');
// const EAC1 = extractAndConvert({ name: 'Max' }, 'age'); //Argument of type '"age"' is not assignable to parameter of type '"name"'.ts(2345)

console.log('extractAndConvert:: ', EAC);

interface Rabbit {
  name: string;
  age: number;
  place: string;
  move: () => void;
}
type KeyofRabbit = keyof Rabbit;

const rabbit1: KeyofRabbit = 'place';
// const rabbit2:KeyofRabbit = "food" //Type '"food"' is not assignable to type 'keyof Rabbit'.ts(2322)

console.log(rabbit1);

//제네릭 클래스
class DataStorage<T extends string | object> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }
  getItems() {
    return [...this.data];
  }
}
const textStorage = new DataStorage<string>();
textStorage.addItem('Adie');
textStorage.addItem('Nuel');
textStorage.addItem('Clala');
textStorage.addItem('Tisie');
textStorage.removeItem('Nuel');

console.log(textStorage.getItems());

const objStorage = new DataStorage<object>();
const maxObj = { name: 'Max' };
objStorage.addItem(maxObj);
objStorage.addItem({ name: 'Yori' });
objStorage.addItem({ name: 'Riki' });
objStorage.removeItem(maxObj);
console.log(objStorage.getItems());

//제네릭 유틸리티 타입
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  completeUntil: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = completeUntil;
  return courseGoal as CourseGoal;
}

//readonly
const names: Readonly<string[]> = ['Max', 'Nina'];
// names.push('Sari'); //Property 'push' does not exist on type 'readonly string[]'.ts(2339)
// names.pop('Sari'); //Property 'pop' does not exist on type 'readonly string[]'.ts(2339)
