import {
  AddAction,
  ChangeAction,
  ChangeOrderAction,
  DeleteAction,
  DeleteCompleteAction,
  DeleteTodoIdAction,
  FetchTodosAction,
  FilterAction,
  InitAction,
  InitTodoIdsAction,
} from './interfaces';

export type Action =
  | InitAction
  | FetchTodosAction
  | AddAction
  | ChangeAction
  | DeleteAction
  | DeleteCompleteAction
  | FilterAction
  | InitTodoIdsAction
  | ChangeOrderAction
  | DeleteTodoIdAction;
