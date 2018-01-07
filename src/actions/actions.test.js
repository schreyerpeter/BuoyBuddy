import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './index'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })
  it('creates FETCH_BUOYS_SUCCESS', () => {
    fetchMock
      .getOnce('/buoys', { headers: { 'content-type': 'application/json' } })
    const store = mockStore({ allBuoys: {} })
    return store.dispatch(actions.fetchBuoys()).then(() => {
    })
  })
})
