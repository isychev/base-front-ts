import actionCreator from './actionCreator';
import { LIST_DELETE } from './constantsList';
import { IListPayload } from './typesList';

export const onDeleteList = actionCreator<IListPayload>(LIST_DELETE);

export default onDeleteList;
