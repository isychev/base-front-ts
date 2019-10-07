import { REQUEST_ERROR } from './constantsRedux';
import actionCreator from './actionCreator';

const onRequestError = actionCreator(REQUEST_ERROR);

export default onRequestError;
