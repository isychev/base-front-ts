import { compose } from 'recompose';
import { IModalHOCProps, IModalProps } from './typesModal';
import withHide from './withHide';
import withModalGetParameters from './withModalGetParameters';

export const withModal = compose<IModalProps, IModalHOCProps & IModalProps>(
  withModalGetParameters,
  withHide,
);

export default withModal;
