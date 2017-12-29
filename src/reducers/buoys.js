import * as actionTypes from '../actionTypes';
const xml2js = require('xml2js');

export default function(
  state = {
    hasError: false,
    data: {}
  },
  action
) {
  switch (action.type) {
    case actionTypes.FETCH_BUOYS_SUCCESS:
      let data = {};
      try {
        xml2js.parseString(action.payload.data, { trim: true }, function(
          err,
          result
        ) {
          data = result;
        });
      } catch (error) {
        return Object.assign({}, state, { hasError: true });
      }
      return Object.assign({}, state, { data });
    case actionTypes.FETCH_BUOYS_FAIL:
      return Object.assign({}, state, { hasError: true });
    default:
      return state;
  }
}
