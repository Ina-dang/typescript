import Link from 'next/link';
import MeetupDatail from '../../components/meetups/MeetupDetail';

const DetailPage = () => {
  const data = {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnYUL6P1RgRcl__MV2hCiI3t3ZZSR0ogDcpA&usqp=CAU',
    title: '첫번째 모임',
    address: '영등포구청역 3번출구',
    description: '첫번쨰 모임',
  };
  return <MeetupDatail {...data} />;
};

export default DetailPage;
