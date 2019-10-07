import actionCreator from './actionCreator';
import { LIST_CREATE } from './constantsList';
import { IListPayload } from './typesList';

export const onCreateList = actionCreator<IListPayload>(LIST_CREATE);

export default onCreateList;
