import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchBuoys, addFavorite, removeFavorite } from '../actions';
import BuoysListComponent from '../components/BuoyList';

const mapStateToProps = state => {
  return {
    buoys: state.buoys,
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { fetchBuoys, addFavorite, removeFavorite },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BuoysListComponent);
