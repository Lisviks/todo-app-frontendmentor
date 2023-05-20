import mongoose from 'mongoose';

const TodoIdsSchema = new mongoose.Schema({
  ids: [{ type: String, required: true }],
  userId: { type: String, required: true },
});

const TodoIdsModel = mongoose.models.TodoIds || mongoose.model('TodoIds', TodoIdsSchema);

export default TodoIdsModel;
