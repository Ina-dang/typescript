//intersection 객체타입이랑 할때 유용하지만 어떤타입이든 가능

type Admin = {
  // interface Admin  {
  name: string;
  privileges: string[];
};

type Employee = {
  // interface Employee  {
  name: string;
  startDate: Date;
};

type ElevatedEmplyee = Admin & Employee; // 객체 속성의 조합
// interface ElevatedEmplyee extends Admin , Employee{}

const e1: ElevatedEmplyee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; // 객체 속성의 조합

//타입가드
function add100(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name:: ' + emp.name);
  if ('privileges' in emp) {
    console.log('Privileges:: ' + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('Start Date:: ' + emp.startDate);
  }
}
printEmployeeInformation(e1);
printEmployeeInformation({ name: 'Manu', startDate: new Date() });

class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }
  loadCargo(amount: number) {
    console.log('Loading cargo ... ' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // if ('loadCargo' in vehicle) {
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}
useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  //타입안정성 증가
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
  }
  console.log('Moving with speed: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 1 });
// moveAnimal({ type: 'horse', flyingSpeed: 1 }); //Argument of type '{ type: "horse"; flyingSpeed: number; }' is not assignable to parameter of type 'Animal'. Object literal may only specify known properties, and 'flyingSpeed' does not exist in type 'Horse'

//화면에 랜더링 하고자 하는 타입 알려주가
// const userInput = document.getElementById('user-Input')!;
// userInput.value = 'Hi there!'; //Property 'value' does not exist on type 'HTMLElement'.ts(2339)

const userInput = <HTMLInputElement>document.getElementById('user-Input');
// const userInput = document.getElementById('user-Input')! as HTMLInputElement;

if (userInput) {
  (userInput as HTMLInputElement).value = 'Hi there!';
}

//인덱스속성
interface ErrorContainer {
  //{email:'유효하지 않은 이메일입니다.', username: '값을 입력하세요.' ...몇개가 들어올지 모름}
  // id:number; //Property 'id' of type 'number' is not assignable to 'string' index type 'string'.ts(2411)
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: '유효한 이메일이 아닙니다.',
  username: '첫 글자는 영어 대문자를 입력하세요.',
};

//함수 오버로드
const result1 = add100(1, 5);
const result2 = add100('Max', ' Schwarz') as String;
// result1.split(' ') //Property 'split' does not exist on type 'string | number'.
result2.split(' ');

function add101(n: string, b: string): string;
function add101(a: number, b: number): number;
function add101(a: string, b: number): string;
function add101(a: number, b: string): string;
function add101(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result3 = add101(1, 5);
const result4 = add101('Max', ' Schwarz');
result4.split(' ');
