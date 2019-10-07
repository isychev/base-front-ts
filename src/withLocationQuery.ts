import { connect } from 'react-redux';
import selectorRouting from './selectorRouting';

const withLocationQuery = connect(selectorRouting);

export default withLocationQuery;
