import actionCreator from './actionCreator';
import { LIST_LOAD } from './constantsList';
import { IListAsyncPayload } from './typesList';

export const onLoadList = actionCreator<IListAsyncPayload>(
  LIST_LOAD,
  {},
  { callApi: true },
);
export default onLoadList;
