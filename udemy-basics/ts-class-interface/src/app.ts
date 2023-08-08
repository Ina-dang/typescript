//데코레이터 => 실체화 되기 전 클래스가 정의만 되어있어도 실행된다. 실체화를 삭제해도 작동된다.
//클래스, 템플릿, 메소드, 인자등 다양한 데코레이터 패턴으로 사용할 수 있다.

//Logger함수를 퍼스트 클래스 데코레이터로 만들기
// function Logger(constructor: Function) {
//   console.log('Logging...');
//   console.log('constructor:: ', constructor);
// }

// 데코레이터 팩토리 작업
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log('[LOGGIN-FACTORY]');
    console.log(logString);
    console.log('constructor:: ', constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('[TEMPLATE-FACTORY]');
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    //데코레이터 반환값 추가 하여 새 컨스트럭터나 새 클래스, 새 함수 반환가능
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log('Rendering template');
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger('LOGGING-PERSON') //식별자 어노테이션
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Max';
  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);

function Log(target: any, propertyName: string | Symbol) {
  console.log('*************Property decorator!*************');
  console.log(target, propertyName);
}

//access decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('*************Accessor decorator!*************');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

//method decorator
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('*************method decorator!*************');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

//postion : 인수 . 매개변수 데코레이터
function Log4(target: any, name: string | Symbol, position: number) {
  console.log('*************position decorator!*************');
  console.log(target);
  console.log(name);
  console.log(position);
}

@Logger('LOGGING-PRODUCTS')
class Products {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Products('Book', 19);
const p2 = new Products('Apple', 2);
