import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Favorite from './Favorite';

const propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.string),
  buoys: PropTypes.shape({
    title: PropTypes.array,
    description: PropTypes.array
  })
};

class FavoritesList extends Component {
  render() {
    const { favorites, buoys } = this.props;
    let buoyList = [];
    if (buoys && buoys.data && buoys.data.rss && buoys.data.rss.channel[0].item)
      buoyList = buoys.data.rss.channel[0].item;
    const favoriteBuoys = favorites.map(favoriteBuoyId => {
      const favoriteBuoyData = buoyList.filter(
        b => b.guid[0]['_'] === favoriteBuoyId
      );
      return <Favorite key={favoriteBuoyId} data={favoriteBuoyData} />;
    });
    return favoriteBuoys.length > 0 ? (
      <div id="favorites_container">
        <h4 id="favorites_title">Your Favorites</h4>
        <div id="favorites_list">{favoriteBuoys}</div>
      </div>
    ) : null;
  }
}

FavoritesList.propTypes = propTypes;
export default FavoritesList;
