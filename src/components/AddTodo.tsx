import { useTodosDispatch } from '@/context/TodosContext';
import { useState } from 'react';

export default function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useTodosDispatch();

  return (
    <div className='input-field'>
      <div
        className={'checkbox'}
        onClick={() => {
          setText('');
          dispatch({
            type: 'ADD',
            id: Date.now(),
            text: text,
          });
        }}
      ></div>
      <input type='text' placeholder='Create a new todo...' value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
}
