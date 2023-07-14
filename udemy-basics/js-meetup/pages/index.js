import { MongoClient } from 'mongodb';
import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>모임기록지</title>
        <meta name='description' content='술자리 약속 담기' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

//SSR 서버요청 방식
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   //fetch data from an API ...
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

//SSG-사전랜더링 방식
export async function getStaticProps() {
  //클라이언트사이드에 들어가지 않음. 빌드 프로세스중에 실행되기때문
  //fetch data from an API ...
  const client = await MongoClient.connect(
    'mongodb+srv://inadang:PGu0grWA0KlOypmg@inadang.layhnvt.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  console.log(meetups);
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, //점진적 정적 생성 기능 (regenerate) 페이지에 요청이 들어오면 10초마다 서버에서 페이지 다시 생성
  }; //꼭 객체를 반환해야함 주로 프롭스 반환
}

export default HomePage;
