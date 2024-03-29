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

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,

    // 참조할 객체 트리거
    get() {
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    },
  };
  return adjDescriptor;
}
class Printer {
  message = 'This works';
  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const button = document.querySelector('button');
button?.addEventListener('click', p.showMessage); //undefined => @Autobind 데코레이터를 사용해서 This work 출력하도록 바꿈
button?.addEventListener('click', p.showMessage.bind(p)); //This works

//Validation Decorator
interface VlidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; //['required', 'positive']
  };
}

const registeredValidators: VlidatorConfig = {};

function Required(target: any, propName: string) {
  const targetName = target.constructor.name;

  if (propName === 'title') {
    registeredValidators[targetName] = {
      ...registeredValidators[targetName],
      [propName]: [
        ...(registeredValidators[targetName]?.[propName] ?? []),
        'required',
      ],
    };
  } else {
    registeredValidators[targetName] = {
      ...registeredValidators[targetName],
      [propName]: [
        ...(registeredValidators[targetName]?.[propName] ?? []),
        'positive',
      ],
    };
  }
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }

  let isValid = true;

  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}
class Course {
  @Required
  title: string;
  @Required
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form');
courseForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert('유효하지 않은 입력값입니다.');
  }
  console.log(createdCourse);
});
