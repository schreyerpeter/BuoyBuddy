import React from 'react';
import { shallow, mount } from 'enzyme';
import BuoyList from './BuoyList';

const props = {
  allBuoys: {
    data: {
      rss: {
        channel: [
          {
            item: [
              {
                description: [
                  '<strong>January 6, 2018 5:18 pm EST</strong><br />…mperature:</strong> 32&#176;F (-0.1&#176;C)<br />'
                ],
                'georss:point': ['39.933 -75.142'],
                guid: [
                  {
                    _: 'NDBC-PHBP1-20180106221800'
                  }
                ],
                link: [
                  'http://www.ndbc.noaa.gov/station_page.php?station=phbp1'
                ],
                pubDate: ['Sat, 06 Jan 2018 22:46:14 +0000'],
                title: ['Station PHBP1 - 8545240 - PHILADELPHIA, PA']
              },
              {
                description: [
                  '<strong>January 6, 2018 5:18 pm EST</strong><br />…mperature:</strong> 32&#176;F (-0.1&#176;C)<br />'
                ],
                'georss:point': ['39.933 -75.142'],
                guid: [
                  {
                    _: 'NDBC-PHBP1-20180106221800'
                  }
                ],
                link: [
                  'http://www.ndbc.noaa.gov/station_page.php?station=phbp1'
                ],
                pubDate: ['Sat, 06 Jan 2018 22:46:14 +0000'],
                title: ['Station PHBP1 - 8545240 - PHILADELPHIA, PA']
              }
            ]
          }
        ]
      }
    },
    hasError: false,
    isFetching: false
  },
  fetchBuoys: () => {},
  addFavorite: () => {},
  removeFavorite: () => {}
};

describe('BuoyList', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<BuoyList {...props} />);
    expect();
  });
  it('should render a buoy_container element', () => {
    const wrapper = shallow(<BuoyList {...props} />);
    expect(wrapper.find('#buoys_container')).toHaveLength(1);
  });
  it('should render a buoys_error element if there is an error', () => {
    const wrapper = shallow(<BuoyList {...props} hasError={true} />);
    expect(wrapper.find('#buoys_error')).toHaveLength(1);
  });
  it('should render a buoys_fetching element if is still fetching', () => {
    const wrapper = shallow(<BuoyList {...props} isFetching={true} />);
    expect(wrapper.find('#buoys_fetching')).toHaveLength(1);
  });
  it('should return true if it matches an ID from the store with one in the NOAA data', () => {
    const favoriteBuoys = {
      data: [
        {
          id: 'NDBC-PHBP1-20180106221800'
        }
      ]
    };
    const wrapper = shallow(
      <BuoyList {...props} favoriteBuoys={favoriteBuoys} />
    );
    wrapper.setState({
        dataSource: [{ guid: [{ _: 'NDBC-PHBP1-20180106221801' }] }]
      });
    expect(wrapper.instance().handleClick('NDBC-PHBP1-20180106221801')).toEqual(
      true
    );
    expect(wrapper.instance().props.addFavorite('NDBC-PHBP1-20180106221801'));
  });
  it('should return false if it does not match an ID from the store with one in the NOAA data', () => {
    const favoriteBuoys = {
      data: [
        {
          id: 'NDBC-PHBP1-20180106221801'
        }
      ]
    };
    const wrapper = shallow(
      <BuoyList {...props} favoriteBuoys={favoriteBuoys} />
    );
    wrapper.setState({
      dataSource: [{ guid: [{ _: 'NDBC-PHBP1-20180106221801' }] }]
    });
    expect(wrapper.instance().handleClick('NDBC-PHBP1-20180106221801')).toEqual(
      false
    );
  });
  it('should set the state on componentDidUpdate', () => {
    const favoriteBuoys = {
      data: [
        {
          id: 'NDBC-PHBP1-20180106221801'
        }
      ]
    };
    const wrapper = shallow(
      <BuoyList {...props} favoriteBuoys={favoriteBuoys} />
    );
    wrapper.setState({ dataSource: [] });
    wrapper.instance().componentDidUpdate();
    expect(wrapper.state().dataSource).toEqual(
      props.allBuoys.data.rss.channel[0].item
    );
  });
});
