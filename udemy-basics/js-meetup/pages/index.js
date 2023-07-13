import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

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

const HomePage = () => {
  const [loaded, setLoaded] = useState([]);
  useEffect(() => {
    setLoaded(DUMMY_MEETUPS);
  }, []);
  return <MeetupList meetups={loaded} />;
};

export default HomePage;
