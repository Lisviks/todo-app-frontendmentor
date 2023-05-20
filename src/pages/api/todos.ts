import TodoModel from '@/models/Todo';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const todos = await TodoModel.find();
        res.status(200).json({ todos });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
      break;
    case 'POST':
      const todo = await TodoModel.create({ text: req.body.text, userEmail: req.body.userEmail, complete: false });
      res.status(201).json({ todo });
      break;
    case 'DELETE':
      if (req.query.id) {
        await TodoModel.deleteOne({ _id: req.query.id });
        res.status(204).end();
      }
      if (req.query.complete) {
        const deleteCount = await TodoModel.deleteMany({ complete: true });
        console.log(deleteCount);
        res.status(200).json({ deleteCount });
      }
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
