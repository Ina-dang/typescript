import { expect, test, vi } from 'vitest';

const calculator = {
  add: (a: number, b: number) => a + b,
};

test('spyOn', () => {
  const spyAdd = vi.spyOn(calculator, 'add');

  const result = calculator.add(2, 3);

  expect(spyAdd).toHaveBeenCalled();
  expect(spyAdd).toHaveBeenCalledTimes(1);
  expect(result).toBe(5);
});
