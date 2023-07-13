import Link from 'next/link';
import MeetupDatail from '../../components/meetups/MeetupDetail';

const DetailPage = (props) => {
  return <MeetupDatail {...props.meetupData} />;
};

//동적라우팅 때 대체페이지-free generated
export async function getStaticPaths() {
  return {
    fallback: true, //true: 없는 path도 기본으로 찾아가봄. false: 없으면 404에러 뜸
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
    ],
  };
}

//SSG
export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  return {
    props: {
      meetupData: {
        id: meetupId,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnYUL6P1RgRcl__MV2hCiI3t3ZZSR0ogDcpA&usqp=CAU',
        title: '첫번째 모임',
        address: '영등포구청역 3번출구',
        description: '첫번쨰 모임',
      },
    },
  };
}

export default DetailPage;
