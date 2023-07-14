import classes from './MeetupDetail.module.css';
import Link from 'next/link';

const MeetupDetail = (props) => {
  console.log('@@@@', props);
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
      <button>
        <Link href={'/'}>목록</Link>
      </button>
    </section>
  );
};

export default MeetupDetail;
