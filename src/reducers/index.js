import { combineReducers } from 'redux';
import buoyReducer from './buoys';

const buoyBuddyApp = combineReducers({
  buoys: buoyReducer
});

export default buoyBuddyApp;
