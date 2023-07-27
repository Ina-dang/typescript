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
