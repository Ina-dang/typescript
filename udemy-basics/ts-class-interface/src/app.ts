// class Sample {
//   constructor() {} //클래스와 연결되며 객체가 생성되며 실행되는 클래스에 기반해 연결하는 객체에 대한 초기화 작업
// }

class Department {
  name: string;
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    // console.log('Department: ', age); //Cannot find name 'age'.ts(2304)
    console.log('Department: ', this.name);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department('Accounting');

console.log(accounting);
accounting.describe();

// const accountingCopy = { describe: accounting.describe };
// accountingCopy.describe(); //undefined
// const accountingCopy = { describe: accounting.describe() };
// accountingCopy.describe;
// const accountingCopy = { name: 'Laura', describe: accounting.describe };
// accountingCopy.describe();

accounting.addEmployee('Mark');
accounting.addEmployee('Jax');

// accounting.employees[2] = 'Anna'; //Property 'employees' is private and only accessible within class 'Department'.ts(2341)

accounting.describe();
accounting.printEmployeeInformation();
