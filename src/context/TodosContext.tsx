import { AddAction, ChangeAction, DeleteAction, ProviderPropsInterface, Todo } from '@/interfaces';
import React, { createContext, useContext, useReducer } from 'react';

type Action = AddAction | ChangeAction | DeleteAction;

export const TodosContext = createContext<Todo[]>([]);
export const TodosDispatchContext = createContext<React.Dispatch<any>>(() => {
  throw new Error('TodosDispatchContext value not initialized');
});

export const TodosProvider = ({ children }: ProviderPropsInterface) => {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>{children}</TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
export const useTodosDispatch = () => useContext(TodosDispatchContext);

const todosReducer = (todos: Todo[], action: Action) => {
  switch (action.type) {
    case 'ADD': {
      return [...todos, { id: action.id, text: action.text, complete: false }];
    }
    case 'CHANGE': {
      return todos.map((todo) => {
        if (todo.id === action.todo.id) {
          return action.todo;
        } else {
          return todo;
        }
      });
    }
    case 'DELETE': {
      return todos.filter((todo) => todo.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + JSON.stringify(action));
    }
  }
};

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
