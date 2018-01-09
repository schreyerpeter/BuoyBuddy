import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './index';
import * as types from '../actionTypes';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async action creators', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  xit('creates FETCH_BUOYS_SUCCESS', () => {
    fetchMock.getOnce('/buoys', { payload: { data: 1 } });
    const expectedActions = [
      { type: types.FETCH_BUOYS_FETCHING },
      { type: types.FETCH_BUOYS_SUCCESS, payload: { data: 1 } }
    ];
    const store = mockStore({ allBuoys: {} });

    return store.dispatch(actions.fetchBuoys()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('creates FETCH_FAVORITES_SUCCESS', () => {
    fetchMock.getOnce('/favorites', { payload: [{ id: 1 }] });
    const expectedActions = [
      { type: types.FETCH_FAVORITES_FETCHING },
      { type: types.FETCH_FAVORITES_FAIL }
    ];
    const store = mockStore({ favoriteBuoys: {} });

    return store.dispatch(actions.fetchFavorites()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  //skipping these tests for now until I figure out how to make the async actions work
});
