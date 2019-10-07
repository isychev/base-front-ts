import * as React from 'react';
import { Dispatch } from 'redux';
import getProcessedActions from './getProcessedActions';
import { IObjAllActions } from './types';

export interface IRunActionProps {
  dispatch: Dispatch;
}
type withRunActionDidMount = <P extends IRunActionProps>(
  beginActions: IObjAllActions,
  endActions?: IObjAllActions,
) => (WrappedComponent: React.ComponentType<P>) => React.ComponentType<P>;

const withRunActionDidMount: withRunActionDidMount = (
  beginActions: IObjAllActions,
  endActions?: IObjAllActions,
) => <P extends IRunActionProps>(
  Component: React.ComponentType<P>,
): React.ComponentType<P> =>
  class WithRunActionDidMountHOC extends React.PureComponent<P> {
    public componentDidMount() {
      this.executeAction(beginActions);
    }

    public componentWillUnmount() {
      if (endActions) {
        this.executeAction(endActions);
      }
    }

    public executeAction = (actions: IObjAllActions) => {
      const { dispatch } = this.props;
      if (dispatch) {
        const processedActions = getProcessedActions(actions, this.props);
        Object.keys(processedActions).forEach(actionKey => {
          dispatch(processedActions[actionKey]);
        });
      }
    };

    public render() {
      return <Component {...this.props} />;
    }
  };

export default withRunActionDidMount;
