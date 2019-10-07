import {
  ENTITY_CREATE,
  ENTITY_DELETE,
  ENTITY_LOAD_COMPLETE,
  ENTITY_LOAD_ERROR,
  ENTITY_LOAD_START,
  ENTITY_LOAD_SUCCESS,
  ENTITY_UPDATE,
} from './constantsEntity';
import { TEMP_PREFIX } from './constantsRedux';

import { IAction, IPayload } from './types';

import { IEntityState } from './typesEntities';

const defaultState: any = {};

export default function reducerEntities<S extends IEntityState>(
  state: S = defaultState,
  action: IAction<IPayload>,
): S {
  const { type, payload = {} } = action;
  switch (type) {
    case ENTITY_DELETE: {
      const { entityAlias } = payload;
      if (entityAlias) {
        const { [entityAlias]: _, ...other } = state;
        return other as S;
      }

      return state;
    }
    case ENTITY_UPDATE: {
      const { entityAlias, data, error, loading, loaded, replace } = payload;
      if (entityAlias) {
        const currentEntity = state[entityAlias] || {};
        const currentData = (currentEntity || {}).data;
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
          [entityAlias]: {
            data: newData,
            error: 'error' in payload ? error : currentEntity.error,
            loaded: 'loaded' in payload ? loaded : currentEntity.loaded,
            loading: 'loading' in payload ? loading : currentEntity.loading,
          },
        };
      }
      return state;
    }

    case ENTITY_CREATE: {
      const { entityAlias, data } = payload;
      if (entityAlias && data) {
        return {
          ...state,
          [entityAlias]: {
            data,
            error: false,
            loaded: true,
            loading: false,
          },
        };
      }
      return state;
    }
    case ENTITY_LOAD_START: {
      const { entityAlias } = payload;
      if (entityAlias) {
        return {
          ...state,
          [entityAlias]: {
            data: state[entityAlias] ? state[entityAlias].data : null,
            error: false,
            loaded: false,
            loading: true,
          },
        };
      }
      return state;
    }

    case ENTITY_LOAD_ERROR: {
      const { entityAlias } = payload;
      if (entityAlias) {
        const entityAliasTemp: string = `${entityAlias}_${TEMP_PREFIX}`;
        const { [entityAliasTemp]: _, ...otherState } = state;
        return {
          ...(otherState as S),
          [entityAlias]: {
            data:
              state[entityAlias] && 'data' in state[entityAlias]
                ? state[entityAlias].data
                : null,
            error: true,
            loaded: false,
            loading: false,
          },
        };
      }
      return state;
    }

    case ENTITY_LOAD_COMPLETE: {
      const { entityAlias, data } = payload;
      if (entityAlias && 'data' in payload) {
        const entityAliasTemp: string = `${entityAlias}_${TEMP_PREFIX}`;
        return {
          ...state,
          [entityAliasTemp]: {
            data,
            error: false,
            loaded: false,
            loading: false,
          },
        };
      }
      return state;
    }

    case ENTITY_LOAD_SUCCESS: {
      const { entityAlias, data } = payload;
      if (entityAlias) {
        const entityAliasTemp: string = `${entityAlias}_${TEMP_PREFIX}`;
        const { [entityAliasTemp]: _, ...otherState } = state;
        return {
          ...(otherState as S),
          [entityAlias]: {
            data:
              state[entityAliasTemp] && 'data' in state[entityAliasTemp]
                ? state[entityAliasTemp].data
                : data,
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
