import { expect, test } from 'vitest';

test('1 is 1', () => {
  expect(1).toBe(1);
});

// 자스의 부동 소수점연산은 toBe 대신 toBeCloseTo 매처함수를 사용 (0.1+0.2는 0.3이 아니므로)
test('return the sum of the given two integers', () => {
  expect(add(0.1, 0.2)).toBeCloseTo(0.3);
});

function add(x: number, y: number) {
  return x + y;
}

// 객체또한 레퍼런스(메모리내에서 주소)가 다르기 때문에 빈객체 두개비교도 false로 나옴
test('an empty object is an empty object', () => {
  // expect({}).toBe({});

  const obj = {};
  expect(obj).toBe(obj);
});

//toEqual => 메모리주소가 아닌 객체의 실제모습을 기준으로 검증
test('return a user object', () => {
  expect(getUser(1)).toEqual({
    no: 1,
    email: 'user1@test.com',
  });
});

function getUser(no: number) {
  return {
    no,
    email: `user${no}@test.com`,
  };
}

// 일부 속성 검사 (toMatchObject(),toHaveProperty())
test('객체', () => {
  const user = {
    no: 1,
    email: 'john.doe@test.com',
    firstName: 'John',
    lastName: 'Doe',
  };
  expect(user).toMatchObject({ firstName: 'John', lastName: 'Doe' });
  expect(user).toHaveProperty('firstName', 'John');
  expect(user).toHaveProperty('lastName');
});

// 배열의 길이나 특정원소가 들어있는지 확인 (toHaveLength(), toContain())
test('array', () => {
  const colors = ['Red', 'Yellow', 'Blue'];
  expect(colors).toHaveLength(3);
  expect(colors).toContain('Yellow');
  expect(colors).not.toContain('Green');
});

// 배열 객체의 경우는 toContainEqaul()사용
test('array object ', () => {
  const colors = [{ color: 'Red' }, { color: 'Yellow' }, { color: 'Blue' }];
  expect(colors).toContainEqual({ color: 'Yellow' });
  expect(colors).not.toContainEqual({ color: 'Green' });
});

// 정규식 테스트
test('string', () => {
  expect(getUser(1).email).toBe('user1@test.com');
  expect(getUser(2).email).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
});

// undefined, null 체크
const findUser = (no: number) => {
  const users = [
    { no: 1, email: 'user1@test.com' },
    { no: 2, email: 'user2@test.com' },
    { no: 3, email: 'user3@test.com' },
  ];
  return users.find((user) => user.no === no) ?? null;
};

test('find a user object', () => {
  expect(findUser(1)).toBeDefined();
  // expect(findUser()).not.toBeDefined(); // findUser 리턴문에 널병합 연산자 없으면 해당 not.사용
});

test('returns null if no user is ', () => {
  expect(findUser(999)).toBeNull();
});

// true, falsy 구분
test('number 0 is falsy but string 0 is truthy', () => {
  expect(0).toBeFalsy();
  expect('0').toBeTruthy();
});

// 자료형 검사 toBeTypeOf()
test('typeof ', () => {
  expect(1).toBeTypeOf('number');
  expect('1').toBeTypeOf('string');
});

// 프로토타입체인 검사 toBeInstanceOf()
test('instanceof', () => {
  const date = new Date();
  expect(date).toBeInstanceOf(Date);
  expect(date).toBeInstanceOf(Object);
});

// 예외 발생 테스트
function getThrowErrorOfUser(no: number) {
  if (no < 0) throw new Error('Invalid User Number');
  return {
    no,
    email: `user${no}@test.com`,
  };
}

test('throw when no is negative', () => {
  // 예외 발생할 함수 호출부분을 함수로 감싸줘야 예외 발생 여부 체크. 아니면 테스트 도중 진짜 예외 발생..
  expect(() => getThrowErrorOfUser(-1)).toThrowError();
  expect(() => getThrowErrorOfUser(-1)).toThrowError('Invalid User Number');
  expect(() => getThrowErrorOfUser(-1)).toThrowError(/invalid/i);
  expect(() => getThrowErrorOfUser(-1)).toThrow(
    new Error('Invalid User Number')
  );
});

// toBe대신 적절한 매처함수를 사용해야 정확히 어떤 속성이 다르고 어디서 오류가 난건지 Vitest에서 피드백을 받을 수 있음
test.skip('toBe', () => {
  const obj1 = { a: 1, b: 2 };
  const obj2 = { a: 1, b: 3 };
  expect(JSON.stringify(obj1) === JSON.stringify(obj2)).toBe(true);
});

// skip함수를 쓰면 테스트를 제외하고 실행한다. 반대로 only 함수를 쓰면 특정 테스트만 실행한다.
test.skip('toEqual', () => {
  const obj1 = { a: 1, b: 2 };
  const obj2 = { a: 1, b: 3 };
  expect(obj1).toEqual(obj2);
});
