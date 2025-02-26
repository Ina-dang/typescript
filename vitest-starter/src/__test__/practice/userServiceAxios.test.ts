import { expect, test, vi } from 'vitest';
import { findOne } from '../../practice';
import axios from 'axios';

// 모킹없이 findOne 결과 테스트
test('findOne return a user', async () => {
  const user = await findOne(1);
  console.log(user);
  expect(user).toHaveProperty('id', 1);
  expect(user).toHaveProperty('name', 'Leanne Graham');
  expect(user).toHaveProperty('website', 'hildegard.org');
});

// 'findOne' 함수가 API 엔드포인트에서 데이터를 잘 가져오는지 확인
test('findOne fetches data from the API endpoint', async () => {
  // axios.get 메서드를 spy로 감시
  const spyGet = vi.spyOn(axios, 'get');
  await findOne(1);

  expect(spyGet).toHaveBeenCalledTimes(1);
  // axios.get가 정확한 URL로 호출되었는지 확인
  expect(spyGet).toHaveBeenCalledWith(
    `https://jsonplaceholder.typicode.com/users/1`
  );
});

/**
 * 위 테스트는 API서버 다운, 네트워크 제한환경(CI서버)에서 오류가 발생하기때문에
 * axios객체의 get함수가 항상 안정적으로 결과를 반환하도록 mocking 추가
 */
test('findOne returns what axios get returns', async () => {
  axios.get = vi.fn().mockResolvedValue({
    data: {
      id: 1,
      name: 'nadang',
    },
  });

  const user = await findOne(1);
  expect(user).toHaveProperty('id', 1);
  expect(user).toHaveProperty('name', 'nadang');
});
