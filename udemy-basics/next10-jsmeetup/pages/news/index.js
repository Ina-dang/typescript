import { Fragment } from 'react';
import Link from 'next/link';

const NewsPage = () => {
  return (
    <Fragment>
      <h1>NewsPage</h1>;
      <ul>
        <li>
          <Link href='/news/1'>타입스크립트공부</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default NewsPage;
