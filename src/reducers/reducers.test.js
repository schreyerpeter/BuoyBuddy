import React from 'react';
import { shallow } from 'enzyme';
import combinedReducers from './index';
import { createStore } from 'redux';

describe('combinedReducers', () => {
  it('should return initial state of the store', () => {
    const store = createStore(combinedReducers);
    const initialState = {
      allBuoys: { data: {}, hasError: false, isFetching: false },
      favoriteBuoys: {
        data: [],
        hasError: false,
        inProgress: false,
        isFetching: false
      }
    };
    expect(store.getState()).toEqual(initialState);
  });
  it('should return dispatch an action to the store and update state', () => {
    const action = { type: 'REMOVE_FAVORITE_IN_PROGRESS' };
    const store = createStore(combinedReducers);
    const newState = {
      allBuoys: { data: {}, hasError: false, isFetching: false },
      favoriteBuoys: {
        data: [],
        hasError: false,
        inProgress: true,
        isFetching: false
      }
    };
    store.dispatch(action);
    expect(store.getState()).toEqual(newState);
  });
});
