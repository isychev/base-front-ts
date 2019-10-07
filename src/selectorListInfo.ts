import { listModuleName } from './constantsList';
import getListAlias from './getListAlias';
import { IBaseListField, IListPayload, IStateWithList } from './typesList';

const selectorListInfo = (
  state: IStateWithList,
  props: IListPayload,
): IBaseListField | null => {
  const listAlias = getListAlias(state, props);
  if (state[listModuleName] && state[listModuleName][listAlias]) {
    return state[listModuleName][listAlias];
  }
  return null;
};

export default selectorListInfo;
