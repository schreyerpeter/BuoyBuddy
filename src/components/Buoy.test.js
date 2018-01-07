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
  handleClick: () => true
};

describe('Buoy', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Buoy {...props} />);
    expect();
  });
  it('should update its state upon receiving new props', () => {
    const wrapper = shallow(<Buoy {...props} isFavorite={false} />);
    expect(wrapper.state().isFavorite).toEqual(false);
    wrapper.instance().componentWillReceiveProps({ isFavorite: true });
    expect(wrapper.state().isFavorite).toEqual(true);
  });
  it('should update its state upon being clicked', () => {
    const wrapper = shallow(<Buoy {...props} isFavorite={false} />);
    expect(wrapper.state().isFavorite).toEqual(false);
    wrapper.instance().handleClick();
    expect(wrapper.state().isFavorite).toEqual(true);
  });
  it('should update its state upon mouse enter and leave', () => {
    const wrapper = shallow(<Buoy {...props} />);
    expect(wrapper.state().isSelected).toEqual(false);
    wrapper.instance().handleMouseEnter();
    expect(wrapper.state().isSelected).toEqual(true);
    wrapper.instance().handleMouseLeave();
    expect(wrapper.state().isSelected).toEqual(false);
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
});
