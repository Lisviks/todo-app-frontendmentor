import { useTodos } from '@/context/TodosContext';
import React, { useState } from 'react';

export default function AddTodo() {
  const [text, setText] = useState('');
  const { addTodo } = useTodos();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAddTodo();
  };

  const handleAddTodo = () => {
    if (text.length > 0) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <div className='input-field'>
      <div className={'checkbox'} onClick={handleAddTodo}></div>
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
