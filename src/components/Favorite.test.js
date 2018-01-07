import React from 'react';
import { shallow } from 'enzyme';
import Favorite from './Favorite';

const props = {
  data: [
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
      link: ['http://www.ndbc.noaa.gov/station_page.php?station=phbp1'],
      pubDate: ['Sat, 06 Jan 2018 22:46:14 +0000'],
      title: ['Station PHBP1 - 8545240 - PHILADELPHIA, PA']
    }
  ]
};

describe('Buoy', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Favorite {...props} />);
    expect(wrapper.find('.favorite-item')).toHaveLength(1);
    expect(wrapper.text()).toEqual(
      'Name: Station PHBP1 - 8545240 - PHILADELPHIA, PAID: NDBC-PHBP1-20180106221800January 6, 2018 5:18 pm EST…mperature: 32°F (-0.1°C)'
    );
  });
});
