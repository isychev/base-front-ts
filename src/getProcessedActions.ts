import {
  IAction,
  IActionNullFunc,
  IObjAllActions,
  IObjExecutedAction,
} from './types';

const getProcessedActions = (
  actions: IObjAllActions,
  props?: object,
): IObjExecutedAction =>
  Object.keys(actions).reduce((result, key) => {
    if (actions[key]) {
      let resultAction: IAction | null = null;
      if (
        actions &&
        actions[key] &&
        Object.prototype.hasOwnProperty.call(actions[key], 'type')
      ) {
        resultAction = actions[key] as IAction;
      } else if (typeof actions[key] === 'function') {
        const execFunc: IActionNullFunc = actions[key] as IActionNullFunc;
        resultAction = execFunc(props) as IAction;
      }
      if (resultAction !== null) {
        return { ...result, [key]: resultAction };
      }
    }

    return result;
  }, {});
export default getProcessedActions;
