import { DATA_PROPERTY } from './constantsRedux';
import selectorTempInfo from './selectorTempInfo';
import { IStateWithTemp, ITempPayload } from './typesTemp';

const selectorTemp = (state: IStateWithTemp, props: ITempPayload): any => {
  const tempInfo = selectorTempInfo(state, props);
  return tempInfo && DATA_PROPERTY in tempInfo ? tempInfo[DATA_PROPERTY] : null;
};

export default selectorTemp;
