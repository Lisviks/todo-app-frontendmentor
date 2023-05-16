import { Todo } from '@/interfaces';
import { Types } from 'mongoose';
import React from 'react';

export const fetchTodos = async (dispatch: React.Dispatch<any>) => {
  const res = await fetch('/api/todos');
  const data = await res.json();
  // dispatch({ type: 'FETCH_TODOS', todos: data.todos });
  return data;
};

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
  // dispatch({ type: 'CHANGE', todo: data.todo });
};

export const deleteCompleteTodos = async (dispatch: React.Dispatch<any>) => {
  await fetch('/api/todos?complete=true', {
    method: 'DELETE',
  });
  dispatch({ type: 'DELETE_COMPLETE' });
};

export const fetchTodoIds = async (dispatch: React.Dispatch<any>) => {
  const res = await fetch(`/api/todo-ids`);
  const data = await res.json();
  dispatch({ type: 'FETCH_TODO_IDS', todoIds: { _id: data.todoIds._id, ids: data.todoIds.ids } });
  return data;
};

export const saveTodoIds = async (id: string, todoIds: string[]) => {
  const res = await fetch(`/api/todo-ids?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: todoIds }),
  });
  const data = await res.json();
  console.log(data);
};

// export const initTodoIds = (todos: Todo[], dispatch: React.Dispatch<any>) => {
//   const localStorageTodoIds = localStorage.getItem('FEM-todo-ids');
//   let todoIds;
//   if (!localStorageTodoIds) {
//     todoIds = todos.map((todo) => todo.id);
//     localStorage.setItem('FEM-todo-ids', JSON.stringify(todoIds));
//   } else {
//     todoIds = JSON.parse(localStorageTodoIds);
//     changeTodosOrder(todoIds, todos, dispatch);
//   }
//   dispatch({ type: 'INIT_TODO_IDS', todoIds });
// };

export const initTodos = async (dispatch: React.Dispatch<any>) => {
  const { todos } = await fetchTodos(dispatch);
  const {
    todoIds: { _id, ids },
  } = await fetchTodoIds(dispatch);
  console.log(todos);
  console.log(ids);
  const { newTodos } = changeTodosOrder(ids, todos, dispatch);

  dispatch({ type: 'INIT', todos: newTodos, todoIds: { _id: _id, ids: ids } });
};

export const changeTodosOrder = (todoIds: string[], todos: Todo[], dispatch: React.Dispatch<any>) => {
  const newTodos = Array.from(todos);
  console.log(newTodos);
  newTodos.sort((a, b) => {
    return todoIds.indexOf(a.id) - todoIds.indexOf(b.id);
  });
  console.log(newTodos);
  dispatch({ type: 'CHANGE_ORDER', newTodos, newTodoIds: todoIds });

  return { newTodos, todoIds };
};
