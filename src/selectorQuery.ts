import { createSelector } from 'reselect';
import selectorLocation from './selectorLocation';
import {
  ILocationQuery,
  ILocationWithQuery,
  IStateWithRouting,
} from './typesRouting';

const selectorQuery = createSelector<
  IStateWithRouting,
  any,
  ILocationWithQuery | null,
  ILocationQuery
>(
  [selectorLocation],
  (location: ILocationWithQuery | null): ILocationQuery =>
    location && location.query ? location.query : {},
);

export default selectorQuery;
