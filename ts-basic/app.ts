function add(n1: number, n2: number) {
  return n1 + n2;
}
// 반환문이 없을 때 void
function printResult(num: number): void {
  console.log('Result:: ', num);
}

printResult(add(5, 12));

let someValue: undefined;

let combineValues: Function;

combineValues = add;
// combineValues = 5 //Type 'number' is not assignable to type 'Function'.ts(2322)

console.log(combineValues(8, 8));

let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';
if (typeof userInput === 'string') {
  userName = userInput;
}

//never:  아무것도 반환하지 않겠다는걸 명시적으로 보여줌
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

const errorResult = generateError('An error occured!', 500);

console.log(errorResult);
