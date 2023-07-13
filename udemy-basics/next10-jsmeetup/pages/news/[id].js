//함수형 컴포넌트에서 url 가져오기
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const DetailPage = () => {
  const router = useRouter();
  const id = router.query.newsId;

  //요청, 응답 api 연동 여기서 가능

  return (
    <Fragment>
      <h1>DetailPage {id} </h1>
      <button>
        <a href='/news'>목록</a>
      </button>
    </Fragment>
  );
};

export default DetailPage;
