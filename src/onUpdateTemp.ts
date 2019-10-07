import actionCreator from './actionCreator';
import { TEMP_UPDATE } from './constantsTemp';
import { ITempPayload } from './typesTemp';

export const onUpdateTemp = actionCreator<ITempPayload>(TEMP_UPDATE);

export default onUpdateTemp;
