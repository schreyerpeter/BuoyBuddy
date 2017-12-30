import { combineReducers } from 'redux';
import buoyReducer from './buoys';
import favoritesReducer from './favorites';

const buoyBuddyApp = combineReducers({
  buoys: buoyReducer,
  favorites: favoritesReducer
});

export default buoyBuddyApp;
