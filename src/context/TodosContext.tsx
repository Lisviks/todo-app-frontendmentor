import { ProviderPropsInterface, State, Todo } from '@/interfaces';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { todosReducer } from './reducer';
import { initTodos } from './actions';

const initialTodos: Todo[] = [];
const initialState: State = { todos: initialTodos, filter: 'all', todoIds: { _id: '', ids: [] } };

export const TodosContext = createContext<State>(initialState);
export const TodosDispatchContext = createContext<React.Dispatch<any>>(() => {
  throw new Error('TodosDispatchContext value not initialized');
});

export const TodosProvider = ({ children }: ProviderPropsInterface) => {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  useEffect(() => {
    initTodos(dispatch);
  }, []);

  return (
    <TodosContext.Provider value={state}>
      <TodosDispatchContext.Provider value={dispatch}>{children}</TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
export const useTodosDispatch = () => useContext(TodosDispatchContext);
