import { push, replace } from 'react-router-redux';
import { put, take, delay } from 'redux-saga/effects';
import { REDIRECT } from './constantsRouting';
import { IAction } from './types';
import { IRedirectParams } from './typesRouting';

export default function* sagaRedirect() {
  while (true) {
    const action: IAction<IRedirectParams> = yield take(REDIRECT);
    const { payload } = action;
    if (payload) {
      const { redirectUrl, redirectDelay = 0, replace: isReplace } = payload;
      if (redirectDelay) {
        yield delay(Number(redirectDelay));
      }
      if (redirectUrl && typeof redirectUrl === 'string') {
        if (isReplace) {
          yield put(replace(redirectUrl));
        } else {
          yield put(push(redirectUrl));
        }
      }
    }
  }
}
