import actionCreator from './actionCreator';
import { TEMP_DELETE } from './constantsTemp';
import { ITempPayload } from './typesTemp';

const onDeleteTemp = actionCreator<ITempPayload>(TEMP_DELETE);

export default onDeleteTemp;
