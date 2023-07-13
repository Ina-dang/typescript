export const mongoSet = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://inadang:PGu0grWA0KlOypmg@inadang.layhnvt.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
};
