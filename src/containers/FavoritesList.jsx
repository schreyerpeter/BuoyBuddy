import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchFavorites, removeAllFavorites } from '../actions';
import FavoritesListComponent from '../components/FavoritesList';

const mapStateToProps = state => {
  return {
    allBuoys: state.allBuoys,
    favoriteBuoys: state.favoriteBuoys
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchFavorites, removeAllFavorites }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FavoritesListComponent
);
