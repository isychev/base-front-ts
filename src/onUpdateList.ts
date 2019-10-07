import actionCreator from './actionCreator';
import { LIST_UPDATE } from './constantsList';
import { IListPayload } from './typesList';

export const onUpdateList = actionCreator<IListPayload>(LIST_UPDATE);

export default onUpdateList;
