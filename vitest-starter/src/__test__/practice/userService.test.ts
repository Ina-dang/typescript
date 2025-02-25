import { afterEach, beforeEach, expect, test } from 'vitest';
import { users, UserService } from '../../practice';

let userService: UserService;

// 여러 테스트에 걸쳐서 중복된 코드를 한곳에 적어서 테스트 케이스 실행전 매번 실행되도록 함
beforeEach(() => {
  userService = new UserService();

  users.push(
    { no: 1, email: 'user1@test.com' },
    { no: 2, email: 'user2@test.com' },
    { no: 3, email: 'user3@test.com' }
  );
});

// 서로 다른 테스트 케이스간에 간섭이 일어나지 않도록 afterEach를 사용하여 users 원소 초기화
afterEach(() => {
  users.splice(0);
});

test('findAll()', () => {
  // users.push(
  //   { no: 1, email: 'user1@test.com' },
  //   { no: 2, email: 'user2@test.com' },
  //   { no: 3, email: 'user3@test.com' }
  // );

  const foundUsers = userService.findAll();

  expect(foundUsers).toHaveLength(3);
  expect(foundUsers).toContainEqual({ no: 1, email: 'user1@test.com' });
  expect(foundUsers).toContainEqual({ no: 2, email: 'user2@test.com' });
  expect(foundUsers).toContainEqual({ no: 3, email: 'user3@test.com' });
});

test('findOne()', () => {
  expect(userService.findOne(1)).toHaveProperty('no', 1);
  expect(userService.findOne(2)).toHaveProperty('no', 2);
});

test('create()', () => {
  const user = { no: 4, email: 'user4@test.com' };
  userService.create(user);

  expect(users).toHaveLength(4);
  expect(users).toContainEqual(user);
});

test('delete()', () => {
  // users.push(
  //   { no: 1, email: 'user1@test.com' },
  //   { no: 2, email: 'user2@test.com' },
  //   { no: 3, email: 'user3@test.com' }
  // );

  const no = 3;
  userService.delete(no);

  expect(users).toHaveLength(2);
  expect(users).not.toContainEqual({ no, email: 'user3@test.com' });
});
