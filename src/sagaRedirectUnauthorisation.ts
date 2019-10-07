import { put, take } from 'redux-saga/effects';
import onRedirect from './onRedirect';
import { UNAUTHORISED } from './constantsRedux';

export default function* sagaRedirectUnauthorisation(redirectUrl: string) {
  while (true) {
    yield take(UNAUTHORISED);
    yield put(onRedirect({ redirectUrl }));
  }
}
