import actionCreator from './actionCreator';
import { TEMP_LOAD } from './constantsTemp';
import { ITempAsyncPayload } from './typesTemp';

export const onLoadTemp = actionCreator<ITempAsyncPayload>(TEMP_LOAD);

export default onLoadTemp;
