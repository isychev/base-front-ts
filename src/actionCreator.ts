import { IAction, IActionMeta, IPayload } from './types';

export const actionCreator = <P = IPayload>(
  type: string,
  basePayload?: object,
  baseMeta?: IActionMeta,
): (<P1 = {}>(payload: P & P1, meta?: IActionMeta) => IAction<P & P1>) => <
  P1 = {}
>(
  payload: P & P1,
  meta?: IActionMeta,
): IAction<P & P1> => ({
  type,
  meta: {
    ...baseMeta,
    ...meta,
  },
  payload: {
    ...basePayload,
    ...payload,
  },
});

export default actionCreator;
