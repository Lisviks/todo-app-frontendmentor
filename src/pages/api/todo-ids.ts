import TodoIdsModel from '@/models/TodoIds';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      {
        const { userId } = req.query;
        const todoIds = await TodoIdsModel.findOne({ userId });
        if (!todoIds) return res.status(404).json({ message: 'No todo ids array found' });
        res.status(200).json({ todoIds: todoIds });
      }
      break;
    case 'PUT':
      {
        const updatedIds = await TodoIdsModel.updateOne(
          { userId: req.query.userId },
          { userId: req.query.userId, ids: req.body.ids },
          { new: true, upsert: true }
        );

        res.status(201).json({ todoIds: updatedIds });
      }
      break;
    case 'DELETE':
      {
        const { userId } = req.query;
        const ids = await TodoIdsModel.find({ userId });
        const filteredIds = ids[0].ids.filter((id: string) => id !== req.query.id);
        const updated = await TodoIdsModel.findByIdAndUpdate({ _id: ids[0]._id }, { ids: filteredIds }, { new: true });
        res.status(200).json({ todoIds: updated });
      }
      break;
    default:
      {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
      }
      break;
  }
};

export default handler;
