import {
  AddAction,
  ChangeAction,
  DeleteAction,
  DeleteCompleteAction,
  FilterAction,
  InitTodosAction,
  ProviderPropsInterface,
  State,
  Todo,
} from '@/interfaces';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

type Action = InitTodosAction | AddAction | ChangeAction | DeleteAction | DeleteCompleteAction | FilterAction;

const initialTodos: Todo[] = [];
const initialState: State = { todos: initialTodos, filter: 'all' };

export const TodosContext = createContext<State>(initialState);
export const TodosDispatchContext = createContext<React.Dispatch<any>>(() => {
  throw new Error('TodosDispatchContext value not initialized');
});

export const TodosProvider = ({ children }: ProviderPropsInterface) => {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  useEffect(() => {
    const localStorageTodos = JSON.parse(localStorage.getItem('FEM-todos') || '[]');

    if (localStorageTodos) {
      dispatch({ type: 'INIT_TODOS', todos: localStorageTodos });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem('FEM-todos', JSON.stringify(state.todos));
    }
  }, [state]);

  return (
    <TodosContext.Provider value={state}>
      <TodosDispatchContext.Provider value={dispatch}>{children}</TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
export const useTodosDispatch = () => useContext(TodosDispatchContext);

const todosReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'INIT_TODOS': {
      return { ...state, todos: action.todos };
    }
    case 'ADD': {
      return { ...state, todos: [...state.todos, { id: action.id, text: action.text, complete: false }] };
    }
    case 'CHANGE': {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.todo.id) {
            return action.todo;
          } else {
            return todo;
          }
        }),
      };
    }
    case 'FILTER_TODO': {
      return { ...state, filter: action.filter };
    }
    case 'DELETE': {
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.id) };
    }
    case 'DELETE_COMPLETE': {
      return { ...state, todos: state.todos.filter((todo) => !todo.complete) };
    }
    default: {
      throw Error('Unknown action: ' + JSON.stringify(action));
    }
  }
};
