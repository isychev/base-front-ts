import { Location } from 'history';
import { routingModuleName } from './constantsRouting';

export type GetRedirectUrl = (params: any) => string;

export interface IRedirectParams {
  redirectUrl: string | GetRedirectUrl;
  redirectDelay?: number;
  replace?: boolean;
}

export interface ILocationQuery {
  [key: string]: string | string[] | undefined;
}

export interface ILocationQueryObj {
  query: ILocationQuery;
}
export type ILocationWithQuery = ILocationQueryObj & Location;

export interface IRouterReducer {
  location: ILocationWithQuery | null;
}
export interface IStateWithRouting {
  [routingModuleName]: IRouterReducer;
}
