import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import { mongoSet } from '../utils/mongo';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: '첫번째 모임',
    image: 'https://t1.daumcdn.net/cfile/tistory/996AD63C5A56FE5633',
    address: '영등포구청 3번 출구',
    description: '첫번째 모임!',
  },
  {
    id: 'm2',
    title: '두번째 모임',
    image: 'https://thumb.mt.co.kr/06/2018/10/2018102416372894434_3.jpg',
    address: '영등포구청 3번 출구',
    description: '두번째 모임!',
  },
  {
    id: 'm3',
    title: '세번째 모임',
    image:
      'https://ichef.bbci.co.uk/news/640/cpsprodpb/1784B/production/_110113369_japandrinkinggetty.jpg',
    address: '영등포구청 3번 출구',
    description: '세번째 모임!',
  },
];

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
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
