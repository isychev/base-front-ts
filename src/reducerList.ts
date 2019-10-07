import {
  LIST_CREATE,
  LIST_DELETE,
  LIST_LOAD_COMPLETE,
  LIST_LOAD_ERROR,
  LIST_LOAD_START,
  LIST_LOAD_SUCCESS,
  LIST_UPDATE,
} from './constantsList';
import { TEMP_PREFIX } from './constantsRedux';
import { IAction } from './types';
import { IListState } from './typesList';

const defaultState: any = {};

export interface AppendListParams {
  before?: boolean;
  after?: boolean;
  offset?: number;
}

export const getNewList = (
  currentList: any[],
  data: any[],
  params: AppendListParams = {},
): any[] => {
  const { before = false, after = false, offset } = params;
  if (before) {
    return [...data, ...currentList];
  }
  if (after) {
    return [...currentList, ...data];
  }
  if (typeof offset === 'number' && !Number.isNaN(offset)) {
    const startItems = (currentList || []).slice(0, offset);
    const endItems = (currentList || []).slice(offset);
    return [...startItems, ...data, ...endItems];
  }
  return data && data.length ? data : currentList;
};

export default function reducerList<S extends IListState>(
  state: S = defaultState,
  action: IAction,
): S {
  const { type, payload = {} } = action;
  switch (type) {
    case LIST_DELETE: {
      const { listAlias } = payload;
      if (listAlias) {
        const { [listAlias]: _, ...other } = state;
        return other as S;
      }

      return state;
    }
    case LIST_UPDATE: {
      const {
        listAlias,
        data = [],
        error,
        loading,
        loaded,
        before,
        after,
        offset,
      } = payload;
      if (listAlias) {
        const currentList = state[listAlias] || {};
        const currentData = currentList.data;
        return {
          ...state,
          [listAlias]: {
            data:
              getNewList(currentData, data, {
                before,
                after,
                offset,
              }) || null,
            error: 'error' in payload ? error : currentList.error,
            loaded: 'loaded' in payload ? loaded : currentList.loaded,
            loading: 'loading' in payload ? loading : currentList.loading,
          },
        };
      }
      return state;
    }

    case LIST_CREATE: {
      const { listAlias, data } = payload;
      if (listAlias) {
        return {
          ...state,
          [listAlias]: {
            data: 'data' in payload ? data : null,
            error: false,
            loaded: true,
            loading: false,
          },
        };
      }
      return state;
    }
    case LIST_LOAD_START: {
      const { listAlias } = payload;
      if (listAlias) {
        const currList = state[listAlias] || {};
        return {
          ...state,
          [listAlias]: {
            data: 'data' in currList ? currList.data : null,
            error: false,
            loaded: false,
            loading: true,
          },
        };
      }
      return state;
    }

    case LIST_LOAD_ERROR: {
      const { listAlias } = payload;
      if (listAlias) {
        const listAliasTemp: string = `${listAlias}_${TEMP_PREFIX}`;
        const { [listAliasTemp]: _, ...otherState } = state;
        return {
          ...(otherState as S),
          [listAlias]: {
            data:
              state[listAlias] && 'data' in state[listAlias]
                ? state[listAlias].data
                : null,
            error: true,
            loaded: false,
            loading: false,
          },
        };
      }
      return state;
    }

    case LIST_LOAD_COMPLETE: {
      const { listAlias, data } = payload;
      if (listAlias && 'data' in payload) {
        return {
          ...state,
          [`${listAlias}_${TEMP_PREFIX}`]: {
            data,
            error: false,
            loaded: false,
            loading: false,
          },
        };
      }
      return state;
    }

    case LIST_LOAD_SUCCESS: {
      const { listAlias } = payload;
      if (listAlias) {
        const listAliasTemp: string = `${listAlias}_${TEMP_PREFIX}`;
        const { [listAliasTemp]: _, ...otherState } = state;
        return {
          ...(otherState as S),
          [listAlias]: {
            data:
              state[listAliasTemp] && 'data' in state[listAliasTemp]
                ? state[listAliasTemp].data
                : null,
            error: false,
            loaded: true,
            loading: false,
          },
        };
      }
      return state;
    }

    default:
      return state;
  }
}
