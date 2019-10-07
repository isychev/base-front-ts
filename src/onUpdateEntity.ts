import actionCreator from './actionCreator';
import { ENTITY_UPDATE } from './constantsEntity';
import { IEntityPayload } from './typesEntities';

const onUpdateEntity = actionCreator<IEntityPayload>(ENTITY_UPDATE);

export default onUpdateEntity;
