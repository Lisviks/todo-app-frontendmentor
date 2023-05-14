import {
  AddAction,
  ChangeAction,
  ChangeOrderAction,
  DeleteAction,
  DeleteCompleteAction,
  FetchTodosAction,
  FilterAction,
  InitTodosAction,
} from './interfaces';

export type Action =
  | FetchTodosAction
  | InitTodosAction
  | AddAction
  | ChangeAction
  | DeleteAction
  | DeleteCompleteAction
  | FilterAction
  | ChangeOrderAction;
