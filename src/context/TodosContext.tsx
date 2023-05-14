import { ProviderPropsInterface, State, Todo } from '@/interfaces';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { todosReducer } from './reducer';

const initialTodos: Todo[] = [];
const initialState: State = { todos: initialTodos, filter: 'all', todoIds: [] };

export const TodosContext = createContext<State>(initialState);
export const TodosDispatchContext = createContext<React.Dispatch<any>>(() => {
  throw new Error('TodosDispatchContext value not initialized');
});

export const TodosProvider = ({ children }: ProviderPropsInterface) => {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'FETCH_TODOS', todos: data.todos });
      });
  }, []);

  return (
    <TodosContext.Provider value={state}>
      <TodosDispatchContext.Provider value={dispatch}>{children}</TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
export const useTodosDispatch = () => useContext(TodosDispatchContext);
