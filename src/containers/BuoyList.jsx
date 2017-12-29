import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchBuoys } from '../actions';
import BuoysListComponent from '../components/BuoyList';

const mapStateToProps = buoyData => {
  return {
    buoyData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchBuoys }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BuoysListComponent);
