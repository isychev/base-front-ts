import { APP_NAME, COMPLETE, ERROR, START, SUCCESS } from './constantsRedux';

export const requestModuleName = 'request';
const prefix = `${APP_NAME}/${requestModuleName}`;

export const SEND_REQUEST = `${prefix}/REQUEST`;
export const SEND_REQUEST_START = `${SEND_REQUEST}_${START}`;
export const SEND_REQUEST_COMPLETE = `${SEND_REQUEST}_${COMPLETE}`;
export const SEND_REQUEST_SUCCESS = `${SEND_REQUEST}_${SUCCESS}`;
export const SEND_REQUEST_ERROR = `${SEND_REQUEST}_${ERROR}`;
