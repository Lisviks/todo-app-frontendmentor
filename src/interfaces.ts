export interface ProviderPropsInterface {
  children?: JSX.Element | Array<JSX.Element>;
}

export interface Todo {
  id: string;
  text: string;
  complete: boolean;
}

export interface State {
  todos: Todo[];
  filter: string;
  todoIds: { _id: string; ids: string[] };
}

export interface InitAction {
  type: 'INIT';
  todos: Todo[];
  todoIds: { _id: string; ids: string[] };
}

export interface AddAction {
  type: 'ADD';
  todo: Todo;
}

export interface ChangeAction {
  type: 'CHANGE';
  todo: Todo;
}

export interface DeleteAction {
  type: 'DELETE';
  id: string;
}

export interface DeleteCompleteAction {
  type: 'DELETE_COMPLETE';
}

export interface FilterAction {
  type: 'FILTER_TODO';
  filter: string;
}

export interface InitTodoIdsAction {
  type: 'FETCH_TODO_IDS';
  todoIds: {
    _id: string;
    ids: string[];
  };
}

export interface ChangeOrderAction {
  type: 'CHANGE_ORDER';
  newTodos: Todo[];
  newTodoIds: [];
}

export interface UpdateTodoIdsAction {
  type: 'UPDATE_TODO_IDS';
  todoIds: string[];
}

export interface DeleteTodoIdAction {
  type: 'DELETE_TODO_ID';
  todoId: string;
}

export interface CheckboxInterface {
  complete: boolean;
  handleComplete: Function;
}
