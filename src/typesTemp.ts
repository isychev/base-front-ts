import { tempModuleName } from './constantsTemp';
import { IAsyncPayload, IBaseReducerField } from './types';

export interface ITempPayload {
  tempAlias: string;
}

export type ITempAsyncPayload = ITempPayload & IAsyncPayload;

export interface IBaseTempField extends IBaseReducerField {
  hold?: boolean;
}

export interface ITempState {
  [key: string]: IBaseTempField;
}

export interface IStateWithTemp {
  [tempModuleName]: ITempState;
}
