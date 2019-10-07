import { connect } from 'react-redux';
import onCloseModal from './onCloseModal';
import selectorModalParams from './selectorModalParams';

export const withModalGetParameters = connect(
  selectorModalParams,
  {
    toggle: onCloseModal,
  },
);

export default withModalGetParameters;
