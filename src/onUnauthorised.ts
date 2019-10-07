import actionCreator from './actionCreator';
import { UNAUTHORISED } from './constantsRedux';

const onUnauthorised = actionCreator(UNAUTHORISED);

export default onUnauthorised;
