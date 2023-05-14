import { State } from '@/interfaces';
import { Action } from '@/types';

export const todosReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_TODOS': {
      return { ...state, todos: action.todos };
    }
    // case 'INIT_TODOS': {
    //   return { ...state, todos: action.todos, todoIds: action.todoIds };
    // }
    case 'ADD': {
      return { ...state, todos: [...state.todos, action.todo] };
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
    // case 'FILTER_TODO': {
    //   return { ...state, filter: action.filter };
    // }
    case 'DELETE': {
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.id) };
    }
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
