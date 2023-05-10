export interface ProviderPropsInterface {
  children?: JSX.Element | Array<JSX.Element>;
}

export interface Todo {
  id: number;
  text: string;
  complete: boolean;
}

export interface State {
  todos: Todo[];
  filter: string;
  todoIds: number[];
}

export interface InitTodosAction {
  type: 'INIT_TODOS';
  todos: Todo[];
  todoIds: number[];
}

export interface AddAction {
  type: 'ADD';
  id: number;
  text: string;
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
