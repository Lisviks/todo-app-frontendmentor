import dbConnect from '@/lib/dbConnect';
import TodoModel from '@/models/Todo';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        dbConnect();
        const todos = await TodoModel.find();
        res.status(200).json({ todos });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
      break;
    case 'POST':
      const todo = await TodoModel.create({ text: req.body.text, complete: false });
      res.status(201).json({ todo });
      break;
    case 'DELETE':
      await TodoModel.deleteOne({ _id: req.query.id });
      res.status(204).end();
      break;
    case 'PUT':
      const updatedTodo = await TodoModel.findOneAndUpdate(
        { _id: req.query.id },
        { complete: req.body.complete },
        { new: true }
      );
      res.status(200).json({ todo: updatedTodo });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default handler;
