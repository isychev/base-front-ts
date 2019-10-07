import { IListPayload } from './typesList';

export const getListAlias = (state: object, props: IListPayload): string =>
  props.listAlias || '';

export default getListAlias;
