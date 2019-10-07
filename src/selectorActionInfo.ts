import { createSelector } from 'reselect';
import selectorEntityInfo from './selectorEntityInfo';
import selectorListInfo from './selectorListInfo';
import selectorTempInfo from './selectorTempInfo';
import { IBaseEntityField } from './typesEntities';
import { IBaseListField } from './typesList';
import { IBaseTempField } from './typesTemp';

export const selectorActionInfo = createSelector<
  any,
  any,
  IBaseTempField | null,
  IBaseEntityField | null,
  IBaseListField | null,
  IBaseTempField | IBaseEntityField | IBaseListField | null
>(
  selectorTempInfo,
  selectorEntityInfo,
  selectorListInfo,
  (
    tempInfo: IBaseTempField | null,
    entityInfo: IBaseEntityField | null,
    listInfo: IBaseListField | null,
  ): IBaseTempField | IBaseEntityField | IBaseListField | null =>
    tempInfo || entityInfo || listInfo,
);

export default selectorActionInfo;
