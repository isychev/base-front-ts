import { ITempPayload } from './typesTemp';

const getTempAlias = (state: object, props: ITempPayload): string =>
  props.tempAlias || '';

export default getTempAlias;
