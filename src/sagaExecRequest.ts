import {
  put,
  PutEffect,
  select,
  SelectEffect,
  take,
  TakeEffect,
} from 'redux-saga/effects';
import selectorByAlias from './selectorByAlias';
import { IAction } from './types';
import { IRequestSendRequest } from './typesRequest';
import { generateId, isErrorAction, isSuccessAction } from './utils';

export default function* sagaExecRequest(
  action: IAction,
):
  | IterableIterator<TakeEffect | PutEffect<IAction> | SelectEffect>
  | IRequestSendRequest {
  const uid = generateId();
  yield put({
    ...action,
    meta: {
      ...action.meta,
      uid,
    },
  });
  while (true) {
    const currAction: IAction = yield take('*');
    if (
      (isSuccessAction(currAction) || isErrorAction(currAction)) &&
      currAction &&
      currAction.meta &&
      currAction.meta.uid &&
      currAction.meta &&
      currAction.meta.uid === uid
    ) {
      const data = yield select(selectorByAlias, currAction.payload);
      return {
        action: currAction,
        data: data || (currAction.payload || {}).data || null,
        error: (currAction.payload || {}).error,
      };
    }
  }
}
