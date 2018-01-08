import React from 'react';
import { shallow } from 'enzyme';
import Buoy from './Buoy';

const props = {
  buoyData: {
    description: [
      '<strong>January 6, 2018 5:18 pm EST</strong><br />…mperature:</strong> 32&#176;F (-0.1&#176;C)<br />'
    ],
    'georss:point': ['39.933 -75.142'],
    guid: [
      {
        _: 'NDBC-PHBP1-20180106221800'
      }
    ],
    link: ['http://www.ndbc.noaa.gov/station_page.php?station=phbp1'],
    pubDate: ['Sat, 06 Jan 2018 22:46:14 +0000'],
    title: ['Station PHBP1 - 8545240 - PHILADELPHIA, PA']
  },
  handleMouseEnter: () => {},
  handleMouseLeave: () => {}
};

describe('Buoy', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Buoy {...props} />);
    expect();
  });
  it('should click', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <Buoy
        {...props}
        handleClick={spy}
        isSelected={true}
        inProgress={false}
        isFavorite={true}
      />
    );
    wrapper.find('.favorite-button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
  it('should handle mouse enter', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <Buoy
        {...props}
        handleMouseEnter={spy}
        isSelected={true}
        inProgress={false}
        isFavorite={true}
      />
    );
    wrapper.find('.buoy-item').simulate('mouseEnter');
    expect(spy).toHaveBeenCalled();
  });
  it('should handle mouse leave', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <Buoy
        {...props}
        handleMouseLeave={spy}
        isSelected={true}
        inProgress={false}
        isFavorite={true}
      />
    );
    wrapper.find('.buoy-item').simulate('mouseLeave');
    expect(spy).toHaveBeenCalled();
  });
  it("should render an element with a className of 'buoy-item'", () => {
    const wrapper = shallow(<Buoy {...props} />);
    expect(wrapper.find('.buoy-item')).toHaveLength(1);
  });
  it("should render an element with a className of 'buoy-item'", () => {
    const wrapper = shallow(<Buoy {...props} />);
    expect(wrapper.find('.buoy-item')).toHaveLength(1);
  });
  it("should render an element with a className of 'buoy-item-title-favorite'", () => {
    const wrapper = shallow(
      <Buoy {...props} inProgress={true} isFavorite={true} />
    );
    expect(wrapper.find('.buoy-item-title-favorite')).toHaveLength(1);
  });
  it("should render an element with a className of 'buoy-item-title'", () => {
    const wrapper = shallow(<Buoy {...props} isFavorite={false} />);
    expect(wrapper.find('.buoy-item-title')).toHaveLength(1);
  });
  it("should render an element with a className of 'favorite-button' if it is favorite and selected", () => {
    const wrapper = shallow(
      <Buoy {...props} isFavorite={true} isSelected={true} />
    );
    expect(wrapper.find('.favorite-button')).toHaveLength(1);
  });
  it('', () => {
    const wrapper = shallow(
      <Buoy {...props} isFavorite={true} isSelected={true} />
    );
    wrapper.instance().handleMouseEnter();
  });
});
