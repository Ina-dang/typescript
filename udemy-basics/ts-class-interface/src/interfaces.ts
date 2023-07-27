/**
 * @description 인터페이스
 * 처음은 무조건 대문자
 */
interface Person {
  // name: string = 'Max'; //An interface property cannot have an initializer.ts(1246)
  name: string;
  age: number;

  greet(parase: string): void;
}

let user1: Person;

user1 = {
  name: 'Nina',
  age: 45,
  greet(phrase: string) {
    console.log(phrase + '' + this.name);
  },
};

user1.greet('Hi there - I am ');

// 읽기 전용 인터페이스 속성
interface Named {
  readonly name: string;
  //선택적 매개변수 & 속성
  outputName?: string;
}

// 2. 인터페이스가 확장할 수도 있다. (comma 사용해서 여러개도 가능)
interface Greetable extends Named {
  greet(phrase: string): void;
}

// 1. 상속과의 차이점은 인터페이스는 여러개를 구현할 수 있다
// class Person implements Greetable, Named {
class Person implements Greetable {
  // name: string;
  // name?: string; 빈문자열이 아닐경우에만 선택
  outputName?: string; //옵셔널
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string): void {
    console.log(phrase + '' + this.name);
  }
}

let user2: Greetable = new Person('Laila');

// user2.name('Rirn'); //Property 'name' does not exist on type 'Greetable'.ts(2339)
user2.greet('Hi there - I am ');
console.log(user2);

// type AddFn = (a:number, b:number)=>number
interface AddFn {
  //사용자정의 함수 타입
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
