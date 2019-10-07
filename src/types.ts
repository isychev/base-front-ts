export interface IPayload {
  [x: string]: any;
}
export type IBaseReducerData = any;

export interface IAsyncPayload {
  apiConfig: any;
}

export interface IActionMeta {
  [key: string]: any;
}
export interface IAction<P = IPayload> {
  type: string;
  payload?: P;
  meta?: IActionMeta;
  error?: object;
}

export interface IStatusObject {
  loaded?: boolean;
  loading?: boolean;
  error?: boolean;
}

export interface IBaseReducerField extends IStatusObject {
  data?: IBaseReducerData;
}

export type IActionNullFunc = (props?: any) => IAction | null;

export interface IObjAllActions {
  [key: string]: IAction | IActionNullFunc | null;
}
export interface IObjExecutedAction {
  [key: string]: IAction;
}


export type ColorTypes = 'primary' | 'secondary' | 'success'  | 'danger' | 'warning'| 'info' | 'light' | 'dark'
