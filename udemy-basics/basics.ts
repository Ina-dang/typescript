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
 * Type 'number' is not assignable to type 'string' 오류가 나는 이유
 * 타입스크립트는 명시적인 타입표기가 없어도 가능한 많은 타입을 추론하려한다.
 * 따라서 불필요하게 타입을 지정하지않고 타입 추론을 최대한 많이 이용하는게 좋다.
 * 만약 강좌명처럼 강좌이름 또는 강좌 번호를 써야하는경우는 위처럼 유니온타입 | 을 이용해서 타입을 지정해준다.
 */
