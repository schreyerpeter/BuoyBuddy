import { combineReducers } from 'redux';
import buoyReducer from './buoys';
import favoritesReducer from './favorites';

const buoyBuddyApp = combineReducers({
  allBuoys: buoyReducer,
  favoriteBuoys: favoritesReducer
});

export default buoyBuddyApp;
