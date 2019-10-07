import { APP_NAME, CLOSE, SHOW } from './constantsRedux';

export const modalModuleName = 'request';
const prefix = `${APP_NAME}/${modalModuleName}`;

export const MODAL_SHOW = `${prefix}_${SHOW}`;
export const MODAL_CLOSE = `${prefix}_${CLOSE}`;

export const MODAL_KEY_PARAMS = 'params';
export const MODAL_KEY_NAME = 'modal';
