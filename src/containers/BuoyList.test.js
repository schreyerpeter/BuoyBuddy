import React from 'react';
import { shallow } from 'enzyme';
import BuoyList from './BuoyList';
import { createStore } from 'redux';

describe('BuoyList', () => {
    it('should return bound actions', () => {
        expect(BuoyList.WrappedComponent.propTypes).toHaveProperty('allBuoys');
    })
    //I'm not finding great documentation on testing containers.
});
