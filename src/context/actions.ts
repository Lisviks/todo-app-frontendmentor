import { Todo } from '@/interfaces';
import React from 'react';

const fetchTodos = async (userId: string) => {
  const res = await fetch(`/api/todos?userId=${userId}`);
  const data = await res.json();
  return data;
};

export const addTodo = async (text: string, userId: string, dispatch: React.Dispatch<any>) => {
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, userId }),
  });
  const data = await res.json();
  dispatch({ type: 'ADD', todo: data.todo });
  return data.todo;
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

export const deleteCompleteTodos = async (userId: string, dispatch: React.Dispatch<any>) => {
  await fetch(`/api/todos?userId=${userId}&complete=true`, {
    method: 'DELETE',
  });
  dispatch({ type: 'DELETE_COMPLETE' });
};

export const fetchTodoIds = async (userId: string, dispatch: React.Dispatch<any>) => {
  const res = await fetch(`/api/todo-ids?userId=${userId}`);
  const data = await res.json();
  if (!data.todoIds) {
    const todoIds = { _id: userId, ids: [] };
    dispatch({ type: 'FETCH_TODO_IDS', todoIds: { _id: userId, ids: [] } });
    return todoIds;
  }
  dispatch({ type: 'FETCH_TODO_IDS', todoIds: { _id: data.todoIds._id, ids: data.todoIds.ids } });
  return data.todoIds;
};

export const saveTodoIds = async (userId: string, todoIds: string[], dispatch: React.Dispatch<any>) => {
  await fetch(`/api/todo-ids?userId=${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: todoIds }),
  });
  dispatch({ type: 'UPDATE_TODO_IDS', todoIds });
};

export const initTodos = async (userId: string, dispatch: React.Dispatch<any>) => {
  const { todos } = await fetchTodos(userId);
  const { _id, ids } = await fetchTodoIds(userId, dispatch);
  const { newTodos } = changeTodosOrder(ids, todos, dispatch);

  dispatch({ type: 'INIT', todos: newTodos, todoIds: { _id, ids } });
};

export const changeTodosOrder = (todoIds: string[], todos: Todo[], dispatch: React.Dispatch<any>) => {
  const newTodos = Array.from(todos);
  newTodos.sort((a, b) => {
    return todoIds.indexOf(a.id) - todoIds.indexOf(b.id);
  });
  dispatch({ type: 'CHANGE_ORDER', newTodos, newTodoIds: todoIds });

  return { newTodos, todoIds };
};
