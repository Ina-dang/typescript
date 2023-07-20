type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-string';

function combine(
  n1: Combinable,
  n2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  if (
    (typeof n1 === 'number' && typeof n2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    result = +n1 + +n2;
  } else {
    result = n1.toString() + n2.toString();
  }
  // if (resultConversion === 'as-numnber') {
  //   return +result;
  // } else {
  //   return result.toString();
  // }
  return result;
}

const combinedAges = combine(25, 27, 'as-number');
console.log(combinedAges);
const combinedStringAges = combine('25', '27', 'as-number');
console.log(combinedAges);

const combinedNames = combine('Max', 'Anya', 'as-string');
console.log(combinedNames);

type User = { name: string; age: number };
const u1: User = { name: 'Max', age: 30 };
function greet(user: User) {
  console.log("Hi, I'm " + user.name);
}
greet(u1);
