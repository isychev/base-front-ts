import { APP_NAME, COMPLETE, ERROR, START, SUCCESS } from './constantsRedux';

export const tempModuleName = 'temp';
const prefix = `${APP_NAME}/${tempModuleName}`;

export const TEMP = `${prefix}/TEMP`;
export const TEMP_CREATE = `${TEMP}/CREATE`;
export const TEMP_UPDATE = `${TEMP}/UPDATE`;
export const TEMP_DELETE = `${TEMP}/DELETE`;

export const TEMP_LOAD = `${TEMP}_LOAD`;
export const TEMP_LOAD_START = `${TEMP_LOAD}_${START}`;
export const TEMP_LOAD_COMPLETE = `${TEMP_LOAD}_${COMPLETE}`;
export const TEMP_LOAD_SUCCESS = `${TEMP_LOAD}_${SUCCESS}`;
export const TEMP_LOAD_ERROR = `${TEMP_LOAD}_${ERROR}`;
