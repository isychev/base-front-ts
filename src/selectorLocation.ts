import { createSelector } from 'reselect';
import selectorRouting from './selectorRouting';
import {
  ILocationWithQuery,
  IRouterReducer,
  IStateWithRouting,
} from './typesRouting';

const selectorLocation = createSelector<
  IStateWithRouting,
  any,
  IRouterReducer | null,
  ILocationWithQuery | null
>(
  [selectorRouting],
  (routing: IRouterReducer | null): ILocationWithQuery | null =>
    routing ? routing.location : null,
);

export default selectorLocation;
