import { expect, test, vi } from 'vitest';

const calculator = {
  add: (a: number, b: number) => a + b,
};

// vi.spyOn => 스파잉기능 제공. 함수 호출여부와 어떻게 호출되었는지 확인
test('spyOn', () => {
  const spyAdd = vi.spyOn(calculator, 'add');

  const result = calculator.add(2, 3);

  expect(spyAdd).toHaveBeenCalled();
  expect(spyAdd).toHaveBeenCalledTimes(1);
  expect(result).toBe(5);
});
