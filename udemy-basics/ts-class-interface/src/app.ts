// class Sample {
//   constructor() {} //클래스와 연결되며 객체가 생성되며 실행되는 클래스에 기반해 연결하는 객체에 대한 초기화 작업
// }

class Department {
  static fiscalAYear = 2023;
  protected employees: string[] = [];

  //readonly 특정속성 초기화 이후에는 변경 불가하도록 함 => 안전성 증가, 명확한 의도전달
  constructor(private readonly id: string, public name: string) {}

  //static (ex. Math )
  static createEmployee(name: string) {
    return { name: name };
  }

  describe(this: Department) {
    // console.log('Department: ', age); //Cannot find name 'age'.ts(2304)
    console.log(`Department(${this.id}): ${this.name}`);
    // console.log(this.fiscalYear) //Property 'fiscalYear' does not exist on type 'Department'.ts(2339)
    // console.log(Department.fiscalAYear) //OK
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);
  }

  constructor(id: string, public reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

// const accounting = new Department('D', 'Accounting');
const it = new ITDepartment('D', ['Max']);

console.log(it);
it.describe();

// const accountingCopy = { describe: accounting.describe };
// accountingCopy.describe(); //undefined
// const accountingCopy = { describe: accounting.describe() };
// accountingCopy.describe;
// const accountingCopy = { name: 'Laura', describe: accounting.describe };
// accountingCopy.describe();

it.addEmployee('Mark');
it.addEmployee('Jax');

// accounting.employees[2] = 'Anna'; //Property 'employees' is private and only accessible within class 'Department'.ts(2341)

it.describe();
it.printEmployeeInformation();
console.log(it);

const accounting = new AccountingDepartment('d2', []);
accounting.mostRecentReport = 'Year and Report';
accounting.addReport('Somthing went wrong...');
accounting.addEmployee('Max');
console.log(accounting.mostRecentReport);
accounting.addEmployee('Alura');
accounting.printReports();
accounting.printEmployeeInformation();

const employee1 = Department.createEmployee('Laura');
console.log(employee1, Department.fiscalAYear);
