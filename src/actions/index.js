import axios from 'axios';

import * as actionTypes from '../actionTypes';

export const fetchBuoys = () => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_BUOYS_FETCHING
  });
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

export const fetchFavorites = () => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_FAVORITES_FETCHING
  });
  try {
    const request = await axios.get('/favorites');
    dispatch({
      type: actionTypes.FETCH_FAVORITES_SUCCESS,
      payload: request.data
    });
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_FAVORITES_FAIL
    });
  }
};

export const addFavorite = favorite => async dispatch => {
  dispatch({
    type: actionTypes.ADD_FAVORITE_IN_PROGRESS
  });
  try {
    await axios.post(`/favorites/${favorite.guid[0]['_']}`);
    dispatch({
      type: actionTypes.ADD_FAVORITE_SUCCESS,
      payload: {
        id: favorite.guid[0]['_']
      }
    });
  } catch (err) {
    dispatch({
      type: actionTypes.ADD_FAVORITE_FAIL
    });
  }
};

export const removeFavorite = id => async dispatch => {
  dispatch({
    type: actionTypes.REMOVE_FAVORITE_IN_PROGRESS
  });
  try {
    await axios.delete(`/favorites/${id}`);
    dispatch({
      type: actionTypes.REMOVE_FAVORITE_SUCCESS,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: actionTypes.REMOVE_FAVORITE_FAIL
    });
  }
};

export const removeAllFavorites = () => async dispatch => {
  try {
    await axios.delete(`/favorites`);
    dispatch({
      type: actionTypes.REMOVE_ALL_FAVORITES_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: actionTypes.REMOVE_ALL_FAVORITES_FAIL
    });
  }
};
