import NewMeetUpForm from '../../components/meetups/NewMeetupForm';

const NewMeetUpPage = () => {
  const addMeetupHandler = (enteredMeetupData) => {
    console.log(enteredMeetupData);
  };

  return <NewMeetUpForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetUpPage;
