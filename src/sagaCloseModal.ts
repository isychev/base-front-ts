import { put, select } from 'redux-saga/effects';
import { MODAL_KEY_NAME, MODAL_KEY_PARAMS } from './constantsModal';
import { IAction } from './types';
import { getUrlWithParameters, ILocation } from './utils';

import onRedirect from './onRedirect';
import selectorLocation from './selectorLocation';

export default function* sagaCloseModal(action: IAction) {
  const { payload = {} } = action;
  const { replace = false } = payload;
  const location: ILocation = yield select(selectorLocation, {});
  const redirectUrl = getUrlWithParameters(location, {
    [MODAL_KEY_NAME]: null,
    [MODAL_KEY_PARAMS]: null,
  });
  yield put(onRedirect({ redirectUrl, replace }));
}
