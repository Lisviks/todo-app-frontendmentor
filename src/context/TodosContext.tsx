import { ProviderPropsInterface, State, Todo } from '@/interfaces';
import { Action } from '@/types';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

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
        console.log(data);
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

const todosReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_TODOS': {
      return { ...state, todos: action.todos };
    }
    // case 'INIT_TODOS': {
    //   return { ...state, todos: action.todos, todoIds: action.todoIds };
    // }
    // case 'ADD': {
    //   return { ...state, todos: [...state.todos, { id: action.id, text: action.text, complete: false }] };
    // }
    // case 'CHANGE': {
    //   return {
    //     ...state,
    //     todos: state.todos.map((todo) => {
    //       if (todo.id === action.todo.id) {
    //         return action.todo;
    //       } else {
    //         return todo;
    //       }
    //     }),
    //   };
    // }
    // case 'FILTER_TODO': {
    //   return { ...state, filter: action.filter };
    // }
    // case 'DELETE': {
    //   return { ...state, todos: state.todos.filter((todo) => todo.id !== action.id) };
    // }
    // case 'DELETE_COMPLETE': {
    //   return { ...state, todos: state.todos.filter((todo) => !todo.complete) };
    // }
    // case 'CHANGE_ORDER': {
    //   return { ...state, todos: action.newTodos, todoIds: action.newTodoIds };
    // }
    default: {
      throw Error('Unknown action: ' + JSON.stringify(action));
    }
  }
};
