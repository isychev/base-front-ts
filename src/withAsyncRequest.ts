import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import getProcessedActions from './getProcessedActions';
import selectorActionInfo from './selectorActionInfo';
import { IBaseReducerField, IObjAllActions, IStatusObject } from './types';
import withLoading from './withLoading';
import withRunActionDidMount from './withRunActionDidMount';

export interface IResultProcessAction extends IStatusObject {
  returnData: object;
}

export const defaultAsyncActionState: IBaseReducerField = {
  error: false,
  loaded: false,
  loading: false,
  data: null,
};
export const defaultActionState: IBaseReducerField = {
  error: false,
  loaded: true,
  loading: false,
  data: null,
};
export const asyncRequestConnect = (beginActions: IObjAllActions) =>
  connect(
    (state, ownProps): IStatusObject => {
      // execute actions
      const processedActions = getProcessedActions(beginActions, ownProps);
      // get state all action
      const actionsState = Object.keys(processedActions).reduce(
        (result: IResultProcessAction, key: string) => {
          const { loaded, loading, error } = result;
          // current action
          const action = processedActions[key];

          let actionState: IBaseReducerField = defaultActionState;
          // if async action
          if (action.meta && action.meta.callApi) {
            actionState =
              selectorActionInfo(state, action.payload) ||
              defaultAsyncActionState;
          }

          return {
            error: actionState.error || error,
            loaded: actionState.loaded && loaded,
            loading: actionState.loading || loading,
            returnData: {
              ...result.returnData,
              // main data
              [key]: actionState.data,
              // state data
              [`${key}State`]: {
                error: actionState.loading,
                loaded: actionState.loading,
                loading: actionState.loading,
              },
            },
          };
        },
        {
          error: false,
          loaded: true,
          loading: false,
          returnData: {},
        },
      );

      return {
        error: actionsState.error,
        loaded: actionsState.loaded,
        loading: actionsState.loading,
        ...actionsState.returnData,
      };
    },
  );

export const withAsyncRequest = <P extends IStatusObject>(
  beginActions: IObjAllActions,
  endActions?: IObjAllActions,
) =>
  compose<P, P>(
    asyncRequestConnect(beginActions),
    withRunActionDidMount(beginActions, endActions),
  );

export const withAsyncRequestL = <P extends IStatusObject>(
  beginActions: IObjAllActions,
  endActions?: IObjAllActions,
  LoadingComponent?: React.ComponentType<P>,
  ErrorComponent?: React.ComponentType<P>,
) =>
  compose<P, P>(
    withAsyncRequest<P>(beginActions, endActions),
    withLoading<P>(LoadingComponent, ErrorComponent),
  );
