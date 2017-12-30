import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchBuoys, addFavorite, removeFavorite } from '../actions';
import BuoysListComponent from '../components/BuoyList';

const mapStateToProps = buoyData => {
  return {
    buoyData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchBuoys, addFavorite, removeFavorite }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BuoysListComponent);
