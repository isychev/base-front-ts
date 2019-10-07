import actionCreator from './actionCreator';
import { ENTITY_CREATE } from './constantsEntity';
import { IEntityPayload } from './typesEntities';

const onCreateEntity = actionCreator<IEntityPayload>(ENTITY_CREATE);

export default onCreateEntity;
