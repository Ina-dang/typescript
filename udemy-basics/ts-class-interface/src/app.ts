//데코레이터 => 실체화 되기 전 클래스가 정의만 되어있어도 실행된다. 실체화를 삭제해도 작동된다.

//Logger함수를 퍼스트 클래스 데코레이터로 만들기
// function Logger(constructor: Function) {
//   console.log('Logging...');
//   console.log('constructor:: ', constructor);
// }

// 데코레이터 팩토리 작업
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log('constructor:: ', constructor);
  };
}

@Logger('LOGGING - PERSON') //식별자 어노테이션
class Person {
  name = 'Max';
  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);
