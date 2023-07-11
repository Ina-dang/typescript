let age: number
// age = 'string' //error
age = 24

let userName: string

userName = "Max"

let isInstructor: boolean

isInstructor = true

let hobbies: string[]

hobbies = ["Sports", "Cooking"]

let person: {
  name: string
  age: number
}
person = {
  name: "Max",
  age: 32,
}

let people: (typeof person)[]

people = [
  {
    name: "Max",
    age: 32,
  },
  {
    name: "Laura",
    age: 22,
  },
]

//Type infrrance (타입 추론)

// let course: string = 'React 0 The Complete Guide'
let course: string | number = "React 0 The Complete Guide"
course = 1234
/**
 * @description Type 'number' is not assignable to type 'string' 오류가 나는 이유
 * 타입스크립트는 명시적인 타입표기가 없어도 가능한 많은 타입을 추론하려한다.
 * 따라서 불필요하게 타입을 지정하지않고 타입 추론을 최대한 많이 이용하는게 좋다.
 * 만약 강좌명처럼 강좌이름 또는 강좌 번호를 써야하는경우는 위처럼 유니온타입 | 을 이용해서 타입을 지정해준다.
 */

//Type alias (타입 별명)
type User = {
  name: string
  id: number
}

let user: User

user = {
  name: "Inadang",
  id: 1234,
}

/**
 * @description 타입을 가진 함수 Functions & types
 * 함수가 타입을 지정하는 위치
 * 1. 매개변수 뒤 a: number, b: number
 * 2. 매개변수 목록 뒤 => 매개변수 적는 ()괄호 뒤
 *    매개변수 뒤는 매개변수가 추론해주기 때문에 굳이 명시할 필요가 없다. (커서올려보기) 다만 반환값의 타입에 유니온이 필요할경우 사용.
 */

// 1.
// function add(a: number, b: number):number {
function add(a: number, b: number) {
  return a + b
}

// 2. void
/**
 *
 * void는 함수에 반환값이 없다는 것을 뜻함
 * undefined로 반환될 것
 */
function printOutput(value: any) {
  console.log(value)
}
printOutput(123123)

//제네릭(Generics) => 매개변수랑, 함수명사이에 사용 => 함수에 안정성과 유연성을 동시에 지정
// function insertAtBeginning(array: any[], value: any) {
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array]
  return newArray
}

const demoArray = [1, 2, 3]
const updateArray = insertAtBeginning(demoArray, -1) //[-1,1,2,3]
const stringArray = insertAtBeginning(["a", "b", "c"], "d")
// 제네릭을 사용해서 any타입의 값이 아님을 알려줌=> 배열을 구성하는 값들의 타입은 value와 같아야한다 전달
// updateArray[0].split("") //문자열이 아니라 오류날것
stringArray[0].split("")
