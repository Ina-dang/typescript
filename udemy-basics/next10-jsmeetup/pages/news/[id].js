//함수형 컴포넌트에서 url 가져오기
import { useRouter } from 'next/router';

const DetailPage = () => {
  const router = useRouter();
  const id = router.query.newsId;

  //요청, 응답 api 연동 여기서 가능

  return <h1>DetailPage {id} </h1>;
};

export default DetailPage;
