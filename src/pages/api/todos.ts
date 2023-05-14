import dbConnect from '@/lib/dbConnect';
import TodoModel from '@/models/Todo';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    dbConnect();
    const todos = await TodoModel.find();
    res.status(200).json({ todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
