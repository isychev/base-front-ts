import { routingModuleName } from './constantsRouting';
import { IRouterReducer, IStateWithRouting } from './typesRouting';

export const selectorRouting = (
  state: IStateWithRouting,
): IRouterReducer | null => state[routingModuleName] || null;

export default selectorRouting;
