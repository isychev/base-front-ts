import { entityModuleName } from './constantsEntity';
import { IAsyncPayload, IBaseReducerField } from './types';

export interface IEntityPayload {
  entityAlias: string;
}

export type IEntityAsyncPayload = IEntityPayload & IAsyncPayload;

export type IBaseEntityField = IBaseReducerField;

export interface IEntityState {
  [key: string]: IBaseEntityField;
}

export interface IStateWithEntity {
  [entityModuleName]: IEntityState;
}
