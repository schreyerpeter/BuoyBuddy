import * as actionTypes from '../actionTypes';

export default function(state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_FAVORITES_SUCCESS:
      return [...state, ...action.payload]
    case actionTypes.ADD_FAVORITE:
    console.log(action, state)
      if (!state.includes(action.payload)) return state.concat(action.payload);
      else return state;
    case actionTypes.REMOVE_FAVORITE:
      return [...state.filter(item => item !== action.payload)];
    default:
      return state;
  }
}
