// class Sample {
//   constructor() {} //클래스와 연결되며 객체가 생성되며 실행되는 클래스에 기반해 연결하는 객체에 대한 초기화 작업
// }

class Department {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
}

const accounting = new Department('Accounting');

console.log(accounting);
