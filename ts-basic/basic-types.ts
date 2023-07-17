console.log('코드는 여기에서!!!');
// function add(a: number, b: number) {
//   // console.log(typeof number1);
//   return a + b;
// }

const number1 = 5; //5.0
const number2 = 12.3;

const result = add(number1, number2);

// console.log(result);

let favoriteActivities: string[];
// favoriteActivities = [1,2,3] //Type 'number' is not assignable to type 'string'.ts(2322)
favoriteActivities = ['Game', 'Boarding'];
// const person: {
//   name: string;
//   age: number;
// } = {
const person = {
  name: 'Inadang',
  age: 30,
  hobbies: favoriteActivities,
};

for (const hobby of person.hobbies) {
  console.log(hobby);
  // console.log(hobby.map()); //Property 'map' does not exist on type 'string'.ts(2339)
}

// console.log(person.nickname) //Property 'nickname' does not exist on type '{ name: string; age: number; }'.ts(2339)

/**
 * @description 튜플 작업하기 => 자바스크립트엔 없지만 길이가 고정된 배열
 */
const tuplePerson: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: 'Inadang',
  age: 30,
  hobbies: favoriteActivities,
  role: [2, 'author'],
};

// tuplePerson.role.push('admin'); //Property 'role' does not exist on type '{ name: string; age: number; hobbies: string[]; }'.ts(2339)
tuplePerson.role[0] = 10;

/**
 * @description enum
 */

enum Role {
  ADMIN = 5,
  READ_ONLY = 100,
  AUTHOR = 200,
}
const role = Role.ADMIN;
console.log(role);

let sign: any;
sign = 234;
sign = '234';
sign = { addresss: '234' };
