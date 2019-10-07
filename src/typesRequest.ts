import { IAction, IAsyncPayload, IBaseReducerData } from './types';

export type IRequestAsyncPayload = IAsyncPayload;

export interface IRequestSendRequest {
  data: IBaseReducerData;
  error: Error;
  action: IAction;
}
