import axios from 'axios';

import * as actionTypes from '../actionTypes';

export const fetchBuoys = () => async dispatch => {
  try {
    const request = await axios.get('/buoys');
    dispatch({
      type: actionTypes.FETCH_BUOYS_SUCCESS,
      payload: request
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_BUOYS_FAIL
    });
  }
};
