import { useTodosDispatch } from '@/context/TodosContext';
import React, { useState } from 'react';

export default function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useTodosDispatch();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addTodo();
  };

  const addTodo = () => {
    if (text.length > 0) {
      setText('');
      dispatch({ type: 'ADD', id: Date.now(), text });
    }
  };

  return (
    <div className='input-field'>
      <div className={'checkbox'} onClick={addTodo}></div>
      <input
        type='text'
        placeholder='Create a new todo...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
