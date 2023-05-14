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

export const completeTodo = async (id: string, complete: boolean, dispatch: React.Dispatch<any>) => {
  const res = await fetch(`/api/todos?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ complete }),
  });
  const data = await res.json();
  dispatch({ type: 'CHANGE', todo: data.todo });
};

export const deleteCompleteTodos = async (dispatch: React.Dispatch<any>) => {
  await fetch('/api/todos?complete=true', {
    method: 'DELETE',
  });
  dispatch({ type: 'DELETE_COMPLETE' });
};
