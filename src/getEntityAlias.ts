import { IEntityPayload } from './typesEntities';

export default (state: object, props: IEntityPayload): string =>
  props.entityAlias || '';
