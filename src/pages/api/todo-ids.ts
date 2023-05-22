import clientPromise from '@/lib/mongodb';
import TodoIdsModel from '@/models/TodoIds';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('todoids');

  switch (method) {
    case 'GET':
      {
        const { userId } = req.query;
        const todoIds = await collection.findOne({ userId });
        if (!todoIds) return res.status(404).json({ message: 'No todo ids array found' });
        res.status(200).json({ todoIds });
      }
      break;
    case 'PUT':
      {
        const updatedIds = await collection.updateOne(
          { userId: req.query.userId },
          { $set: { userId: req.query.userId, ids: req.body.ids } },
          { upsert: true }
        );
        res.status(201).json({ todoIds: updatedIds });
      }
      break;
    case 'DELETE':
      // TODO: Fix deleting todo ids
      {
        const { userId, id: todoId } = req.query;
        const ids = await TodoIdsModel.findOne({ userId });
        const filteredIds = ids.ids.filter((id: string) => id !== todoId);
        const updated = await TodoIdsModel.findOneAndUpdate({ userId }, { ids: filteredIds }, { new: true });
        res.status(200).json({ todoIds: updated });
      }
      break;
    default:
      {
        res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
      }
      break;
  }
};

export default handler;
