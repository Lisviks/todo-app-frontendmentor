import TodoIdsModel from '@/models/TodoIds';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const todoIds = await TodoIdsModel.find();
      res.status(200).json({ todoIds: todoIds[0] });
      break;
    case 'PUT':
      const updatedIds = await TodoIdsModel.findByIdAndUpdate(
        { _id: req.query.id },
        { ids: req.body.ids },
        { new: true }
      );
      res.status(201).json({ todoIds: updatedIds });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default handler;
