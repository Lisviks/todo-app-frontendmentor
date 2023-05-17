import {
  AddAction,
  ChangeAction,
  ChangeOrderAction,
  DeleteAction,
  DeleteCompleteAction,
  DeleteTodoIdAction,
  FilterAction,
  InitAction,
  InitTodoIdsAction,
} from './interfaces';

export type Action =
  | InitAction
  | AddAction
  | ChangeAction
  | DeleteAction
  | DeleteCompleteAction
  | FilterAction
  | InitTodoIdsAction
  | ChangeOrderAction
  | DeleteTodoIdAction;
