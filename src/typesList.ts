import { listModuleName } from './constantsList';
import { IAsyncPayload, IBaseReducerField } from './types';

export interface IListPayload {
  listAlias: string;
}

export type IListAsyncPayload = IListPayload & IAsyncPayload;

export type IBaseListField = IBaseReducerField;

export interface IListState {
  [key: string]: IBaseListField;
}

export interface IStateWithList {
  [listModuleName]: IListState;
}
