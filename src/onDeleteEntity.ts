import actionCreator from './actionCreator';
import { ENTITY_DELETE } from './constantsEntity';
import { IEntityPayload } from './typesEntities';

export const onDeleteEntity = actionCreator<IEntityPayload>(ENTITY_DELETE);

export default onDeleteEntity;
