import { LOCATION_CHANGE } from 'react-router-redux';
import { call, fork, put, race, take } from 'redux-saga/effects';
import onRequestError from './onRequestError';
import onUnauthrised from './onUnauthorised';
import { COMPLETE, ERROR, START, SUCCESS } from './constantsRedux';
import { IAction } from './types';

export type IXhrInstance = (...args: any[]) => Promise<any>;

export const sendRequest = (
  params: object,
  xhrInstance: IXhrInstance,
): Promise<any> => {
  if (Array.isArray(params)) {
    return xhrInstance(...params);
  }
  return xhrInstance(params);
};

export function* sagaSendRequest(action: IAction, xhrInstance: IXhrInstance) {
  const { payload = {} } = action;
  yield put({ ...action, type: `${action.type}_${START}` });
  try {
    const response = yield call(sendRequest, payload.apiConfig, xhrInstance);
    const { data, ...otherResponse } = response;

    yield put({
      ...action,
      payload: {
        ...payload,
        data,
        response: otherResponse,
      },
      type: `${action.type}_${COMPLETE}`,
    });
    yield put({
      ...action,
      payload: {
        ...payload,
        data,
        response: otherResponse,
      },
      type: `${action.type}_${SUCCESS}`,
    });
  } catch (error) {
    const errorResponse = error.response || {};
    if (errorResponse.status === 401) {
      yield put(onUnauthrised({ response: errorResponse }));
    }
    yield put(onRequestError({ error, errorResponse }));

    yield put({
      ...action,
      error,
      type: `${action.type}_${ERROR}`,
    });
  }
}

export default function* sagaRequest(xhrInstance: IXhrInstance) {
  while (true) {
    const action: IAction = yield take('*');
    const { meta = {}, ...rest } = action;
    const { callApi, ...otherMeta } = meta;
    if (callApi) {
      yield race({
        redirect: take(LOCATION_CHANGE),
        request: fork(
          sagaSendRequest,
          { ...rest, meta: otherMeta },
          xhrInstance,
        ),
      });
    }
  }
}
