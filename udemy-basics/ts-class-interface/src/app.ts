//Logger함수를 퍼스트 클래스 데코레이터로 만들것
function Logger(constructor: Function) {
  console.log('Logging...');
  console.log('constructor:: ', constructor);
}

@Logger //식별자 어노테이션
class Person {
  name = 'Max';
  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);
