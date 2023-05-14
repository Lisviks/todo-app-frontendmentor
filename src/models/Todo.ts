import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  complete: Boolean,
});

const TodoModel = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);

export default TodoModel;
