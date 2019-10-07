import { APP_NAME, COMPLETE, ERROR, START, SUCCESS } from './constantsRedux';

export const entityModuleName = 'entities';
const prefix = `${APP_NAME}/${entityModuleName}`;

export const ENTITY = `${prefix}/ENTITY`;
export const ENTITY_UPDATE = `${ENTITY}_UPDATE`;
export const ENTITY_DELETE = `${ENTITY}_DELETE`;
export const ENTITY_CREATE = `${ENTITY}_CREATE`;

export const ENTITY_LOAD = `${ENTITY}_LOAD`;
export const ENTITY_LOAD_START = `${ENTITY_LOAD}_${START}`;
export const ENTITY_LOAD_COMPLETE = `${ENTITY_LOAD}_${COMPLETE}`;
export const ENTITY_LOAD_SUCCESS = `${ENTITY_LOAD}_${SUCCESS}`;
export const ENTITY_LOAD_ERROR = `${ENTITY_LOAD}_${ERROR}`;
