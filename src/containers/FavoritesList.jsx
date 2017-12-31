import { connect } from 'react-redux';

import FavoritesListComponent from '../components/FavoritesList';

const mapStateToProps = state => {
  return {
    buoys: state.buoys,
    favorites: state.favorites
  };
};

export default connect(mapStateToProps)(FavoritesListComponent);
