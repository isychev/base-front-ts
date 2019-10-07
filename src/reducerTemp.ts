import { LOCATION_CHANGE } from 'react-router-redux';
import { TEMP_PREFIX } from './constantsRedux';
import {
  TEMP_CREATE,
  TEMP_DELETE,
  TEMP_LOAD_COMPLETE,
  TEMP_LOAD_ERROR,
  TEMP_LOAD_START,
  TEMP_LOAD_SUCCESS,
  TEMP_UPDATE,
} from './constantsTemp';
import { IAction } from './types';
import { ITempState } from './typesTemp';

const defaultState: any = {};
export default function reducerTemp<S extends ITempState>(
  state: S = defaultState,
  action: IAction,
): S {
  const { type, payload = {} } = action;
  switch (type) {
    case LOCATION_CHANGE: {
      return Object.keys(state).reduce(
        (result: S, tempKey: string) => {
          if (state[tempKey] && state[tempKey].hold) {
            return {
              ...(result as S),
              [tempKey]: state[tempKey],
            };
          }
          return result;
        },
        {} as S,
      );
    }
    case TEMP_CREATE: {
      const { tempAlias, data, hold = false } = payload;
      if (tempAlias && data) {
        return {
          ...state,
          [tempAlias]: {
            data,
            hold,
            error: false,
            loaded: true,
            loading: false,
          },
        };
      }
      return state;
    }
    case TEMP_DELETE: {
      const { tempAlias } = payload;
      if (tempAlias) {
        const { [tempAlias]: _, ...other } = state;
        return other as S;
      }

      return state;
    }

    case TEMP_UPDATE: {
      const {
        tempAlias,
        data,
        hold,
        error,
        loading,
        loaded,
        replace,
      } = payload;
      if (tempAlias) {
        const currentTemp = state[tempAlias] || {};
        const currentData = (currentTemp || {}).data;
        let newData = currentData;
        if ('data' in payload) {
          if (typeof data === 'object' && data !== null && !replace) {
            newData = {
              ...Object(currentData),
              ...data,
            };
          } else {
            newData = data;
          }
        }

        return {
          ...state,
          [tempAlias]: {
            ...currentTemp,
            data: newData,
            error: 'error' in payload ? error : currentTemp.error,
            hold: 'hold' in payload ? hold : currentTemp.hold,
            loaded: 'loaded' in payload ? loaded : currentTemp.loaded,
            loading: 'loading' in payload ? loading : currentTemp.loading,
          },
        };
      }
      return state;
    }
    case TEMP_LOAD_START: {
      const { tempAlias, hold = false } = payload;
      if (tempAlias) {
        const currentTemp = state[tempAlias] || {};
        return {
          ...state,
          [tempAlias]: {
            data: currentTemp.data || null,
            hold: Boolean('hold' in payload ? hold : currentTemp.hold),
            error: false,
            loaded: false,
            loading: true,
          },
        };
      }
      return state;
    }
    case TEMP_LOAD_ERROR: {
      const { tempAlias, hold = false } = payload;
      if (tempAlias) {
        const currentTemp = state[tempAlias] || {};
        return {
          ...state,
          [tempAlias]: {
            data: currentTemp.data || null,
            hold: Boolean('hold' in payload ? hold : currentTemp.hold),
            error: true,
            loaded: false,
            loading: false,
          },
        };
      }
      return state;
    }
    case TEMP_LOAD_COMPLETE: {
      const { tempAlias, data, hold = false } = payload;
      if (tempAlias && 'data' in payload) {
        const currentTemp = state[tempAlias] || {};
        return {
          ...state,
          [`${tempAlias}_${TEMP_PREFIX}`]: {
            data,
            hold: Boolean('hold' in payload ? hold : currentTemp.hold),
            error: false,
            loaded: false,
            loading: false,
          },
        };
      }
      return state;
    }
    case TEMP_LOAD_SUCCESS: {
      const { tempAlias, hold = false } = payload;
      if (tempAlias) {
        const tempAliasTemp = `${tempAlias}_${TEMP_PREFIX}`;
        const { [tempAliasTemp]: _, ...otherState } = state;
        const currentTemp = state[tempAlias] || {};
        return {
          ...(otherState as S),
          [tempAlias]: {
            data:
              state[tempAliasTemp] && 'data' in state[tempAliasTemp]
                ? state[tempAliasTemp].data
                : null,
            hold: Boolean('hold' in payload ? hold : currentTemp.hold),
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
