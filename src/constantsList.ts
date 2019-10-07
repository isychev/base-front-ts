import { APP_NAME, COMPLETE, ERROR, START, SUCCESS } from './constantsRedux';

export const listModuleName = 'lists';
const prefix = `${APP_NAME}/${listModuleName}`;

export const LIST = `${prefix}/LIST`;
export const LIST_UPDATE = `${LIST}_UPDATE`;
export const LIST_DELETE = `${LIST}_DELETE`;
export const LIST_CREATE = `${LIST}_CREATE`;

export const LIST_LOAD = `${LIST}_LOAD`;
export const LIST_LOAD_START = `${LIST_LOAD}_${START}`;
export const LIST_LOAD_COMPLETE = `${LIST_LOAD}_${COMPLETE}`;
export const LIST_LOAD_SUCCESS = `${LIST_LOAD}_${SUCCESS}`;
export const LIST_LOAD_ERROR = `${LIST_LOAD}_${ERROR}`;
