import { IAction } from './types';
import { ERROR, SUCCESS } from './constantsRedux';

export const generateId = (): string => {
  const now = Date.now();
  return String(Math.floor(Math.random() * now));
};

export interface ILocation {
  pathname: string;
  search: string;
  origin: string;
}

export const getUrlWithParameters = (
  location: ILocation,
  newParams: object,
): string => {
  const { pathname, search, origin = '' } = location;
  const urlParams = new URLSearchParams(search);
  Object.keys(newParams).forEach(key => {
    if (urlParams.has(key)) {
      urlParams.delete(key);
    }
    if (!newParams[key] !== undefined && newParams[key] !== null) {
      urlParams.append(key, newParams[key]);
    }
  });
  if (urlParams) {
    return `${origin}${pathname}?${urlParams}`;
  }
  return `${origin}${pathname}`;
};

export const getLocation = (path: string): ILocation => {
  const l = document.createElement('a');
  l.href = path;
  return l;
};

export const appendGetParameters = (path: string, newParams: object): string =>
  getUrlWithParameters(getLocation(path), newParams);

export const isSuccessAction = (action: IAction): boolean =>
  action.type.endsWith(SUCCESS);

export const isErrorAction = (action: IAction): boolean =>
  action.type.endsWith(ERROR);
