import { all, takeEvery } from 'redux-saga/effects';
import { MODAL_CLOSE, MODAL_SHOW } from './constantsModal';
import sagaCloseModal from './sagaCloseModal';
import sagaShowModal from './sagaShowModal';

export default function* sagaModal() {
  yield all([
    takeEvery(MODAL_SHOW, sagaShowModal),
    takeEvery(MODAL_CLOSE, sagaCloseModal),
  ]);
}
