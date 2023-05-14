import React from 'react';

export const addTodo = async (text: string, dispatch: React.Dispatch<any>) => {
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  const data = await res.json();
  dispatch({ type: 'ADD', todo: data.todo });
};

export const deleteTodo = async (id: string, dispatch: React.Dispatch<any>) => {
  await fetch(`/api/todos?id=${id}`, {
    method: 'DELETE',
  });
  dispatch({ type: 'DELETE', id: id });
};
