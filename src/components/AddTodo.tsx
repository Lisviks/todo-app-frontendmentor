import { useTodos, useTodosDispatch } from '@/context/TodosContext';
import { addTodo, saveTodoIds } from '@/context/actions';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

export default function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useTodosDispatch();
  const {
    todoIds: { _id, ids },
  } = useTodos();
  const { data: session } = useSession();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAddTodo();
  };

  const handleAddTodo = async () => {
    if (text.length > 0) {
      const todo = await addTodo(text, session?.user?.id as string, dispatch);
      const updatedTodoIds = Array.from(ids);
      updatedTodoIds.push(todo._id);
      saveTodoIds(_id, updatedTodoIds);
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
