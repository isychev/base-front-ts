import { entityModuleName } from './constantsEntity';
import getEntityAlias from './getEntityAlias';
import {
  IBaseEntityField,
  IEntityPayload,
  IStateWithEntity,
} from './typesEntities';

const selectorEntityInfo = (
  state: IStateWithEntity,
  props: IEntityPayload,
): IBaseEntityField | null => {
  const entityAlias = getEntityAlias(state, props);
  if (state[entityModuleName] && state[entityModuleName][entityAlias]) {
    return state[entityModuleName][entityAlias];
  }
  return null;
};

export default selectorEntityInfo;
