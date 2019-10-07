import actionCreator from './actionCreator';
import { ENTITY_LOAD } from './constantsEntity';
import { IEntityAsyncPayload } from './typesEntities';

const onLoadEntity = actionCreator<IEntityAsyncPayload>(
  ENTITY_LOAD,
  {},
  { callApi: true },
);

export default onLoadEntity;
