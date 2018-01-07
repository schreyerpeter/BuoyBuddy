import React from 'react';
import { shallow } from 'enzyme';
import FavoritesReducer from './favorites';

const initialState = {
  data: [],
  isFetching: false,
  hasError: false,
  inProgress: false
};

describe('FavoritesReducer', () => {
  it('should return state if no action type matches or removing all favorites fails', () => {
    let action = { type: 'NO_MATCH' };
    expect(FavoritesReducer(undefined, action)).toEqual(initialState);
    action = { type: 'REMOVE_ALL_FAVORITES_FAIL' };
    expect(FavoritesReducer(undefined, action)).toEqual(initialState);
  });
  it('should return inProgress true', () => {
    let action = { type: 'ADD_FAVORITE_IN_PROGRESS' };
    expect(FavoritesReducer(undefined, action)).toEqual(
      Object.assign({}, initialState, { inProgress: true })
    );
    action = { type: 'REMOVE_FAVORITE_IN_PROGRESS' };
    expect(FavoritesReducer(undefined, action)).toEqual(
      Object.assign({}, initialState, { inProgress: true })
    );
  });
  it('should return hasError true if something fails', () => {
    let action = { type: 'FETCH_FAVORITES_FAIL' };
    expect(FavoritesReducer(undefined, action)).toEqual(
      Object.assign({}, initialState, { hasError: true })
    );
    action = { type: 'ADD_FAVORITE_FAIL' };
    expect(FavoritesReducer(undefined, action)).toEqual(
        Object.assign({}, initialState, { hasError: true })
      );
      action = { type: 'REMOVE_FAVORITE_FAIL' };
      expect(FavoritesReducer(undefined, action)).toEqual(
          Object.assign({}, initialState, { hasError: true })
        );
  });
  it('should return isFetching true', () => {
    const action = { type: 'FETCH_FAVORITES_FETCHING' };
    expect(FavoritesReducer(undefined, action)).toEqual(
      Object.assign({}, initialState, { isFetching: true })
    );
  });
  it('should return a new data state with items concatenated to data', () => {
    const action = { type: 'FETCH_FAVORITES_SUCCESS', payload: [{id:1}, {id:3}] };
    const state = {
        data: [{id: 2}],
        isFetching: false,
        hasError: false,
        inProgress: false
      };
    const newState = {
        data: [{id: 2}, {id: 1}, {id: 3}],
        isFetching: false,
        hasError: false,
        inProgress: false
    }
    expect(FavoritesReducer(state, action)).toEqual(newState);
  });
  it('should return filtered data', () => {
    const action = { type: 'REMOVE_FAVORITE_SUCCESS', payload: 1 };
    const state = {
        data: [{id: 1}, {id: 2}],
        isFetching: false,
        hasError: false,
        inProgress: false
      };
    expect(FavoritesReducer(state, action)).toEqual(
      Object.assign({}, state, { data: [{id: 2}] })
    );
  });
  it('should return a new data state with an item concatenated', () => {
    const action = { type: 'ADD_FAVORITE_SUCCESS', payload: {id:1} };
    const state = {
        data: [{id: 2}],
        isFetching: false,
        hasError: false,
        inProgress: false
      };
    const newState = {
        data: [{id: 2}, {id: 1}],
        isFetching: false,
        hasError: false,
        inProgress: false
    }
    expect(FavoritesReducer(state, action)).toEqual(newState);
  });
  it('should remove all items from favorites', () => {
    const action = { type: 'REMOVE_ALL_FAVORITES_SUCCESS' };
    const state = {
        data: [{id: 2}],
        isFetching: false,
        hasError: false,
        inProgress: false
      };
    const newState = {
        data: [],
        isFetching: false,
        hasError: false,
        inProgress: false
    }
    expect(FavoritesReducer(state, action)).toEqual(newState);
  });
});
