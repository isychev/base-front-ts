import { createSelector } from 'reselect';
import { MODAL_KEY_NAME, MODAL_KEY_PARAMS } from './constantsModal';
import selectorQuery from './selectorQuery';
import { IModalProps, ISelectorModalParams } from './typesModal';
import { ILocationQuery } from './typesRouting';

export const getModalName = (_: any, props: IModalProps): string =>
  (props && props.modalName) || '';

const selectorModalParams = createSelector<
  any,
  IModalProps,
  ILocationQuery,
  string,
  ISelectorModalParams
>(
  [selectorQuery, getModalName],
  (query: ILocationQuery, modalName: string): ISelectorModalParams => {
    const {
      [MODAL_KEY_NAME]: urlModalName,
      [MODAL_KEY_PARAMS]: urlModalParams,
    } = query;
    const isOpen: boolean = Boolean(modalName && urlModalName === modalName);
    return {
      hide: !isOpen,
      isOpen,
      urlModalParams,
    };
  },
);

export default selectorModalParams;
