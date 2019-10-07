import * as parseUrl from 'query-string';
import { LOCATION_CHANGE, routerReducer } from 'react-router-redux';
import { IAction, IPayload } from './types';
import { IRouterReducer } from './typesRouting';

const defaultStateRouting = {
  location: null,
};

export default function reducerRouting<A extends IPayload>(
  state: IRouterReducer | undefined = defaultStateRouting,
  action: IAction<A>,
): IRouterReducer {
  if (action.type === LOCATION_CHANGE) {
    const stateAfterRouting = routerReducer(state, action);
    if (stateAfterRouting && stateAfterRouting.location) {
      let query = {};
      const nextSearch = stateAfterRouting.location.search;
      const { search } = state.location || { search: '' };
      if (search !== nextSearch) {
        query = parseUrl.parse(nextSearch);
      }
      return {
        ...stateAfterRouting,
        location: {
          ...stateAfterRouting.location,
          query,
        },
      };
    }
  }
  return state;
}
