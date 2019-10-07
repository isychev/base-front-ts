import { put, select } from 'redux-saga/effects';
import { MODAL_KEY_NAME, MODAL_KEY_PARAMS } from './constantsModal';
import onRedirect from './onRedirect';
import selectorLocation from './selectorLocation';
import { IAction } from './types';
import { getUrlWithParameters, ILocation } from './utils';

export default function* sagaShowModal(action: IAction) {
  const { payload = {} } = action;
  const { replace = false, modalName, modalParams = null } = payload;
  const location: ILocation = yield select(selectorLocation, {});
  const redirectUrl = getUrlWithParameters(location, {
    [MODAL_KEY_NAME]: modalName,
    [MODAL_KEY_PARAMS]: modalParams,
  });
  yield put(onRedirect({ redirectUrl, replace }));
}
