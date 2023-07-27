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
