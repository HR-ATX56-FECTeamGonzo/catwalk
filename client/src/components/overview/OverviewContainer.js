import { connect } from 'react-redux';
import Overview from './Overview.js';

var mapStateToProps = ({currentProduct}) => {
  return {currentProduct};
};

var OverviewContainer = connect(mapStateToProps)(Overview);

export default OverviewContainer;
