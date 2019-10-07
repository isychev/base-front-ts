import pathToRegexp, { Key } from 'path-to-regexp';
import queryString from 'query-string';
import { generatePath } from 'react-router';

export interface RoutingUrlParams {
  routingName: string;
  routingParams: object;
}

export const generatePathRouting = (
  pattern: string,
  params?: { [paramName: string]: string | number | boolean },
): string => {
  const baseUrl = generatePath(pattern, params);
  if (params) {
    const keys: Key[] = [];
    pathToRegexp(pattern, keys);
    const allUsedKeys = keys.map((key: Key) => key.name);
    const unusedParams = Object.keys(params).reduce(
      (result: object, key: string) => {
        if (allUsedKeys.indexOf(key) > -1) {
          return result;
        }
        return {
          ...result,
          [key]: params[key],
        };
      },
      {},
    );
    if (Object.keys(unusedParams).length) {
      const queryParams = queryString.stringify(unusedParams);
      if (queryParams) {
        return `${baseUrl}?${queryParams}`;
      }
      return baseUrl;
    }
  }

  return baseUrl;
};

export const getPathDataValue = (
  pathKeyValue: string | string[] | number | boolean,
  rowData: object,
): any => {
  if (typeof pathKeyValue !== 'string' || pathKeyValue[0] !== ':') {
    return pathKeyValue;
  }
  return Object.prototype.hasOwnProperty.call(rowData, pathKeyValue.slice(1))
    ? rowData[pathKeyValue.slice(1)]
    : pathKeyValue;
};

export const generateFromData = (
  linkParams: RoutingUrlParams,
  rowData?: object,
): string => {
  const { routingName, routingParams } = linkParams;
  let routingData = {};

  if (routingParams) {
    routingData = Object.keys(routingParams).reduce((result, key) => {
      const pathKeyValue = routingParams[key];
      let value;
      if (Array.isArray(pathKeyValue)) {
        value = pathKeyValue
          .map(keyValue => getPathDataValue(keyValue, rowData || {}))
          .toString();
      } else {
        value = getPathDataValue(pathKeyValue, rowData || {});
      }
      return {
        ...result,
        [key]: value,
      };
    }, {});
  }

  const url = generatePathRouting(routingName, routingData);

  return decodeURIComponent(url);
};

export default class Routing<R> {
  public static generate = generatePathRouting;

  public static generateFromData = generateFromData;

  public generate = generatePathRouting;

  public generateFromData = generateFromData;

  public routes: R;

  constructor(routes: R) {
    this.routes = routes;
  }
}
