import { expect, test, vi } from 'vitest';

// 빈값 반환
test('mock ', () => {
  const mockFn = vi.fn();
  expect(mockFn()).toBeUndefined();
});

// 특정값 반환
test('mockReturnValue ', () => {
  const mockFn = vi.fn();
  mockFn.mockReturnValue('I am a mock!');
  expect(mockFn()).toBe('I am a mock!');
});

// 비동기 반환
test('mockResolvedValue ', async () => {
  const mockFn = vi.fn();
  mockFn.mockResolvedValue('I will be a mock!');

  expect(await mockFn()).toBe('I will be a mock!');
});

// 함수 재구현
test('mockImplementation', () => {
  const mockFn = vi.fn();
  mockFn.mockImplementation((name) => `I am ${name}!`);

  expect(mockFn('철수')).toBe('I am 철수!');
});

// 인자 및 호출 상태 기억
test('toHaveBeenCalled ', () => {
  const mockFn = vi.fn();

  mockFn();
  mockFn(1);
  mockFn('A');
  mockFn([1, 2], { a: 'b' });

  // mock 함수가 적어도 한 번 호출되었는지 확인
  expect(mockFn).toHaveBeenCalled();

  // mock 함수가 정확히 몇 번 호출되었는지 확인
  expect(mockFn).toHaveBeenCalledTimes(4);

  // mock 함수가 특정 인자로 호출되었는지 확인
  expect(mockFn).toBeCalledWith(1);
  expect(mockFn).toBeCalledWith([1, 2], { a: 'b' });
  expect(mockFn).not.toBeCalledWith(1123);
});
