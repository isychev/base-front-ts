import { connect } from 'react-redux';
import selectorRouting from './selectorRouting';

const withLocation = connect(selectorRouting);

export default withLocation;
