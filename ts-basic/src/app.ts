// 나머지 매개변수
const sum = (...numbers: number[]) => {
  let result = 0;
  numbers.reduce((acc, cur) => {
    return (result = acc + cur);
  });
  return result;
};
console.log(sum(1, 5, 2, 45, 6));

// 배열 및 객체 비구조화 할당

const hobbies = ['Sports', 'Cooking', 'Game', 'Shopping'];
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobby1, hobbies);

const introduce = {
  firstName: 'Lee',
  age: 30,
};
const { firstName, age } = introduce;

console.log(age);
