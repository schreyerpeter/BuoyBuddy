import * as actionTypes from '../actionTypes';

export default function(state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_FAVORITES_SUCCESS:
      return [...state, ...action.payload];
    case actionTypes.ADD_FAVORITE_SUCCESS:
      if (!state.includes(action.payload)) return state.concat(action.payload);
      else return state;
    case actionTypes.REMOVE_FAVORITE_SUCCESS:
      return [...state.filter(item => item.id !== action.payload)];
    case actionTypes.REMOVE_ALL_FAVORITES_SUCCESS:
      return [];
    case actionTypes.REMOVE_ALL_FAVORITES_FAIL:
    default:
      return state;
  }
}
