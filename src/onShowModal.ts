import actionCreator from './actionCreator';
import { MODAL_SHOW } from './constantsModal';
import { IModalProps } from './typesModal';

export const onShowModal = actionCreator<IModalProps>(MODAL_SHOW);

export default onShowModal;
