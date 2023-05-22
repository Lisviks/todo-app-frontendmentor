import {
  AddAction,
  ChangeAction,
  ChangeOrderAction,
  DeleteAction,
  DeleteCompleteAction,
  FilterAction,
  InitAction,
  InitTodoIdsAction,
  UpdateTodoIdsAction,
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
  | UpdateTodoIdsAction;
