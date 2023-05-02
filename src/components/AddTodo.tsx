import Checkbox from './Checkbox';

export default function AddTodo() {
  return (
    <div className='input-field'>
      <Checkbox checked={true} />
      <input type='text' placeholder='Create a new todo...' />
    </div>
  );
}
