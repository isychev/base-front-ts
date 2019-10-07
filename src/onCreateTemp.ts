import actionCreator from './actionCreator';
import { TEMP_CREATE } from './constantsTemp';
import { ITempPayload } from './typesTemp';

const onCreateTemp = actionCreator<ITempPayload>(TEMP_CREATE, {
  hold: false,
});

export default onCreateTemp;
