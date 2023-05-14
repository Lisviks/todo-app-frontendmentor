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
  todoIds: number[];
}

export interface FetchTodosAction {
  type: 'FETCH_TODOS';
  todos: Todo[];
}

export interface InitTodosAction {
  type: 'INIT_TODOS';
  todos: Todo[];
  todoIds: number[];
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
  id: number;
}

export interface DeleteCompleteAction {
  type: 'DELETE_COMPLETE';
}

export interface FilterAction {
  type: 'FILTER_TODO';
  filter: string;
}

export interface ChangeOrderAction {
  type: 'CHANGE_ORDER';
  newTodos: Todo[];
  newTodoIds: [];
}

export interface CheckboxInterface {
  complete: boolean;
  handleComplete: Function;
}
