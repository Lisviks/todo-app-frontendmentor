import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('todos');

  switch (method) {
    case 'GET':
      {
        const { userId } = req.query;
        const todos = await collection
          .find({ userId })
          .project({
            _id: 0,
            id: '$_id',
            userId: 1,
            text: 1,
            complete: 1,
          })
          .toArray();
        res.status(200).json({ todos });
      }
      break;
    case 'POST':
      {
        const result = await collection.insertOne({ text: req.body.text, userId: req.body.userId, complete: false });
        const todo = await collection.findOne({ _id: new ObjectId(result.insertedId) });
        if (todo) {
          todo.id = todo?._id.toString();
        }
        res.status(201).json({ todo });
      }
      break;
    case 'DELETE':
      {
        if (req.query.id) {
          const result = await collection.deleteOne({ _id: new ObjectId(String(req.query.id)) });
          res.status(204).end();
        }
        if (req.query.complete) {
          const result = await collection.deleteMany({ userId: req.query.userId, complete: true });
          res.status(204).end();
        }
      }
      break;
    case 'PUT':
      {
        const result = await collection.updateOne(
          { _id: new ObjectId(String(req.query.id)) },
          { $set: { complete: req.body.complete } }
        );
        if (result.acknowledged) {
          const todo = await collection.findOne({ _id: new ObjectId(String(req.query.id)) });
          if (todo) {
            todo.id = todo?._id.toString();
          }
          return res.status(200).json({ todo });
        }
        res.status(400).json({ message: 'Something went wrong, Try again.' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default handler;
