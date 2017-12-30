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

export const addFavorite = id => dispatch => {
  dispatch({
    type: actionTypes.ADD_FAVORITE,
    payload: id
  })
}

export const removeFavorite = id => dispatch => {
  dispatch({
    type: actionTypes.REMOVE_FAVORITE,
    payload: id
  })
}
