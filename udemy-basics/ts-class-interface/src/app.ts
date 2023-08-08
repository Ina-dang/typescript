//데코레이터 => 실체화 되기 전 클래스가 정의만 되어있어도 실행된다. 실체화를 삭제해도 작동된다.

//Logger함수를 퍼스트 클래스 데코레이터로 만들기
// function Logger(constructor: Function) {
//   console.log('Logging...');
//   console.log('constructor:: ', constructor);
// }

// 데코레이터 팩토리 작업
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log('LOGGIN-FACTORY');
    console.log(logString);
    console.log('constructor:: ', constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    console.log('TEMPLATE-FACTORY');
    //타입스크립트 시그널(_)추가
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  };
}

@Logger('LOGGING-PERSON') //식별자 어노테이션
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Max';
  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);
