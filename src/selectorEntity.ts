import selectorEntityInfo from './selectorEntityInfo';
import { IEntityPayload, IStateWithEntity } from './typesEntities';
import { DATA_PROPERTY } from './constantsRedux';

const selectorEntity = (
  state: IStateWithEntity,
  props: IEntityPayload,
): any => {
  const entityInfo = selectorEntityInfo(state, props);
  return entityInfo && DATA_PROPERTY in entityInfo
    ? entityInfo[DATA_PROPERTY]
    : null;
};

export default selectorEntity;
