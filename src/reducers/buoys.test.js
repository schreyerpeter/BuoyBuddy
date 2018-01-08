import React from 'react';
import { shallow } from 'enzyme';
import BuoysReducer from './buoys';

const initialState = {
  hasError: false,
  isFetching: false,
  data: {}
};

describe('BuoysReducer', () => {
  it('should return state if no action type matches', () => {
    const action = { type: 'NO_MATCH' };
    expect(BuoysReducer(undefined, action)).toEqual(initialState);
  });
  it('should return isFetching true', () => {
    const action = { type: 'FETCH_BUOYS_FETCHING' };
    expect(BuoysReducer(undefined, action)).toEqual(
      Object.assign({}, initialState, { isFetching: true })
    );
  });
  it('should return hasError true', () => {
    const action = { type: 'FETCH_BUOYS_FAIL' };
    expect(BuoysReducer(undefined, action)).toEqual(
      Object.assign({}, initialState, { hasError: true })
    );
  });
  it('should return new data', () => {
    const payload = { data: '<div>test</div>' };
    const action = { type: 'FETCH_BUOYS_SUCCESS', payload };
    expect(BuoysReducer(undefined, action)).toEqual({
      data: { div: 'test' },
      hasError: false,
      isFetching: false
    });
  });
  it('should not return new data if there is a parsing error', () => {
    const payload = { data: '<dv>test</div>' };
    const action = { type: 'FETCH_BUOYS_SUCCESS', payload };
    expect(BuoysReducer(undefined, action)).toEqual({
      data: {},
      hasError: false,
      isFetching: false
    });
  });
});
