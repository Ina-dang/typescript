import { expect, test } from 'vitest';
import { findOne } from '../../practice';

test('findOne return a user', async () => {
  const user = await findOne(1);
  console.log(user);
  expect(user).toHaveProperty('id', 1);
  expect(user).toHaveProperty('name', 'Leanne Graham');
  expect(user).toHaveProperty('website', 'hildegard.org');
});
