import * as actionTypes from '../actionTypes';

export default function(
  state = { data: [], isFetching: false, hasError: false, inProgress: false },
  action
) {
  switch (action.type) {
    case actionTypes.FETCH_FAVORITES_FETCHING:
      return Object.assign({}, state, { isFetching: true });
    case actionTypes.FETCH_FAVORITES_SUCCESS:
      return Object.assign({}, state, {
        data: state.data.concat(...action.payload),
        isFetching: false
      });
    case actionTypes.FETCH_FAVORITES_FAIL:
      return Object.assign({}, state, { hasError: true, isFetching: false });
    case actionTypes.ADD_FAVORITE_IN_PROGRESS:
    case actionTypes.REMOVE_FAVORITE_IN_PROGRESS:
      return Object.assign({}, state, {
        inProgress: true
      });
    case actionTypes.ADD_FAVORITE_SUCCESS:
      return Object.assign({}, state, {
        data: state.data.concat(action.payload),
        inProgress: false
      });
    case actionTypes.REMOVE_FAVORITE_SUCCESS:
      return Object.assign({}, state, {
        data: state.data.filter(item => item.id !== action.payload),
        inProgress: false
      });
    case actionTypes.ADD_FAVORITE_FAIL:
    case actionTypes.REMOVE_FAVORITE_FAIL:
      return Object.assign({}, state, {
        inProgress: false,
        hasError: true
      });
    case actionTypes.REMOVE_ALL_FAVORITES_SUCCESS:
      return Object.assign({}, state, { data: [] });
    case actionTypes.REMOVE_ALL_FAVORITES_FAIL:
    default:
      return state;
  }
}
