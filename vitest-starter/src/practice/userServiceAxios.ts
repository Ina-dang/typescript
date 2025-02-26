import axios from 'axios';

// -----axios 라이브러리 이용 해서 테스트 작성----------------------------
const API_ENDPOINT = 'https://jsonplaceholder.typicode.com';

export function findOne(id: number) {
  return axios.get(`${API_ENDPOINT}/users/${id}`).then((res) => res.data);
}
