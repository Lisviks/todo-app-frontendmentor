import { ProviderPropsInterface, State, Todo } from '@/interfaces';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { todosReducer } from './reducer';
import { changeTodosOrder, fetchTodoIds, fetchTodos, initTodos } from './actions';

const initialTodos: Todo[] = [];
const initialState: State = { todos: initialTodos, filter: 'all', todoIds: { _id: '', ids: [] } };

export const TodosContext = createContext<State>(initialState);
export const TodosDispatchContext = createContext<React.Dispatch<any>>(() => {
  throw new Error('TodosDispatchContext value not initialized');
});

export const TodosProvider = ({ children }: ProviderPropsInterface) => {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  useEffect(() => {
    // fetchTodos(dispatch);
    // fetchTodoIds(dispatch);
    initTodos(dispatch);

    // const localStorageTodoIds = localStorage.getItem('FEM-todo-ids');
    // let todoIds;
    // if (!localStorageTodoIds) {
    //   todoIds = state.todos.map((todo) => todo.id);
    //   localStorage.setItem('FEM-todo-ids', JSON.stringify(todoIds));
    // } else {
    //   todoIds = JSON.parse(localStorageTodoIds);
    //   changeTodosOrder(todoIds, state.todos, dispatch);
    // }
    // dispatch({ type: 'INIT_TODO_IDS', todoIds });
  }, []);

  return (
    <TodosContext.Provider value={state}>
      <TodosDispatchContext.Provider value={dispatch}>{children}</TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
export const useTodosDispatch = () => useContext(TodosDispatchContext);
