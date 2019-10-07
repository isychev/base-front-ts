import { tempModuleName } from './constantsTemp';
import getTempAlias from './getTempAlias';
import { IBaseTempField, IStateWithTemp, ITempPayload } from './typesTemp';

const selectorTempInfo = (
  state: IStateWithTemp,
  props: ITempPayload,
): IBaseTempField | null => {
  const tempAlias = getTempAlias(state, props);
  if (state[tempModuleName] && state[tempModuleName][tempAlias]) {
    return state[tempModuleName][tempAlias];
  }
  return null;
};

export default selectorTempInfo;
