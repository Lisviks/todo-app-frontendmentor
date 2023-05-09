import { AddAction, ChangeAction, DeleteAction, ProviderPropsInterface, State, Todo } from '@/interfaces';
import React, { createContext, useContext, useReducer } from 'react';

type Action = AddAction | ChangeAction | DeleteAction;

const initialTodos: Todo[] = [
  {
    id: 1,
    text: 'Workout',
    complete: true,
  },
  {
    id: 2,
    text: 'Coding',
    complete: false,
  },
  {
    id: 3,
    text: 'Complete todo app',
    complete: false,
  },
];

const initialState: State = { todos: initialTodos, filter: 'all' };

export const TodosContext = createContext<State>(initialState);
export const TodosDispatchContext = createContext<React.Dispatch<any>>(() => {
  throw new Error('TodosDispatchContext value not initialized');
});

export const TodosProvider = ({ children }: ProviderPropsInterface) => {
  const [state, dispatch] = useReducer(todosReducer, initialState);

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
    case 'DELETE': {
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.id) };
    }
    default: {
      throw Error('Unknown action: ' + JSON.stringify(action));
    }
  }
};
