import React from 'react';
import { shallow } from 'enzyme';
import FavoritesList from './FavoritesList';

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
  fetchFavorites: () => {},
  removeAllFavorites: () => {}
};

const favoriteBuoysWithData = {
  data: [
    {
      id: 'NDBC-PHBP1-20180106221800'
    }
  ]
};

const favoriteBuoysWithoutMatchingID = {
  data: [
    {
      id: 'NDBC-PHBP1-20180106221801'
    }
  ]
};

const favoriteBuoysWithoutData = {
  data: []
};

describe('FavoritesList', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <FavoritesList {...props} favoriteBuoys={favoriteBuoysWithData} />
    );
    expect();
  });
  it('should render the container if there are favorite buoys', () => {
    const wrapper = shallow(
      <FavoritesList {...props} favoriteBuoys={favoriteBuoysWithData} />
    );
    expect(wrapper.find('#favorites_container')).toHaveLength(1);
  });
  it('should render the container if there are favorite buoys without matching IDs', () => {
    const wrapper = shallow(
      <FavoritesList
        {...props}
        favoriteBuoys={favoriteBuoysWithoutMatchingID}
      />
    );
    expect(wrapper.find('#favorites_container')).toHaveLength(1);
  });
  it('should not render the container if there are no favorite buoys', () => {
    const wrapper = shallow(
      <FavoritesList {...props} favoriteBuoys={favoriteBuoysWithoutData} />
    );
    expect(wrapper.find('#favorites_container')).toHaveLength(0);
  });
});
