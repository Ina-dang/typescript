import { MongoClient } from 'mongodb';

// POST /api/new-meetup node express같은 방식

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://inadang:PGu0grWA0KlOypmg@inadang.layhnvt.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: '데이터가 정상적으로 저장되었습니다.' });
  }
}

export default handler;
