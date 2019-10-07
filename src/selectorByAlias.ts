import { createSelector } from 'reselect';
import selectorEntity from './selectorEntity';
import selectorList from './selectorList';
import selectorTemp from './selectorTemp';

const selectorByAlias = createSelector<any, any, any, any, any, any>(
  selectorTemp,
  selectorEntity,
  selectorList,
  (temp: any, entity: any, list: any) => entity || list || temp,
);

export default selectorByAlias;
