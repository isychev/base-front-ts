import { DATA_PROPERTY } from './constantsRedux';
import selectorListInfo from './selectorListInfo';
import { IListPayload, IStateWithList } from './typesList';

const selectorList = (state: IStateWithList, props: IListPayload): any => {
  const listInfo = selectorListInfo(state, props);
  return listInfo && DATA_PROPERTY in listInfo ? listInfo[DATA_PROPERTY] : null;
};

export default selectorList;
