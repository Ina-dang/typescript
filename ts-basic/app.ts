function combine(
  n1: number | string,
  n2: number | string,
  resultConversion: 'as-number' | 'as-string'
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
