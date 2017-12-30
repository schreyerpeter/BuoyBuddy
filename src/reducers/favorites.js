import * as actionTypes from '../actionTypes';

export default function(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_FAVORITE:
      if (!state.includes(action.payload)) return [...state, action.payload];
      else return state;
    case actionTypes.REMOVE_FAVORITE:
      return [...state.filter(item => item !== action.payload)];
    default:
      return state;
  }
}
