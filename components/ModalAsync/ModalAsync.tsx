import * as React from 'react';
import { compose } from 'recompose';
import { IModalHOCProps } from '../../typesModal';
import { IObjAllActions, withAsyncRequest,withAsyncRequestL } from '../../withAsyncRequest';
import withModal from '../../withModal';
import { ModalComponent as Modal } from '../Modal';

export interface IModalAsyncProps extends IModalHOCProps {
  loading?: boolean;
  children: React.ComponentType;
  LoadingComponent?: React.ComponentType;
  ErrorComponent?: React.ComponentType;
  beginActions?: IObjAllActions;
  endActions?: IObjAllActions;
  withLoading?: boolean;
}
class ModalAsync extends React.Component<IModalAsyncProps> {
  public static defaultProps: any;

  public renderContent: any;

  public componentWillMount() {
    const {
      children: RenderComponent,
      beginActions = {},
      endActions = {},
      withLoading,
      LoadingComponent,
      ErrorComponent,
    } = this.props;
    this.renderContent = withLoading
      ? withAsyncRequestL<any>(
          beginActions,
          endActions,
          LoadingComponent,
          ErrorComponent,
        )(RenderComponent)
      : withAsyncRequest<any>(beginActions, endActions)(RenderComponent);
  }

  public render() {
    return <Modal {...this.props}>{this.renderContent}</Modal>;
  }
}

ModalAsync.defaultProps = {
  beginActions: {},
  endActions: {},
  withLoading: false,
};

export default compose<IModalAsyncProps, IModalAsyncProps>(withModal)(
  ModalAsync,
);
