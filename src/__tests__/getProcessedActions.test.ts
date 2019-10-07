import getProcessedActions from '../getProcessedActions';
import { IObjAllActions } from '../types';

test('should return action objects', () => {
  const actions: IObjAllActions = {
    test1: {
      type: 'test',
    },
    test2: {
      type: 'test2',
    },
  };

  expect(getProcessedActions(actions)).toEqual(actions);
});

test('should return action objects and execute first action, remove 3-4 action', () => {
  const mainProps = {
    test: 1,
  };
  const actions: IObjAllActions = {
    test1: props => ({
      props,
      type: 'test',
    }),
    test2: {
      type: 'test2',
    },
    test3: () => null,
    test4: null,
  };

  expect(getProcessedActions(actions, mainProps)).toEqual({
    test1: {
      props: mainProps,
      type: 'test',
    },
    test2: {
      type: 'test2',
    },
  });
});
