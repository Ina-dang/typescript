import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const DetailPage = (props) => {
  return <MeetupDetail {...props.meetupData} />;
};

//동적라우팅 때 대체페이지-free generated
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://inadang:PGu0grWA0KlOypmg@inadang.layhnvt.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => {
      return {
        params: { meetupId: meetup._id.toString() },
      };
    }),
  };
}

//SSG
export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;
  console.log('meetupId::', meetupId);
  const client = await MongoClient.connect(
    'mongodb+srv://inadang:PGu0grWA0KlOypmg@inadang.layhnvt.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  console.log('####', selectedMeetup);

  client.close();
  return {
    props: {
      meetupData: {
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default DetailPage;
