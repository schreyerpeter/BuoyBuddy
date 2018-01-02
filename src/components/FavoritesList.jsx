import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Favorite from './Favorite';

const propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      description: PropTypes.string
    })
  ),
  buoys: PropTypes.shape({
    title: PropTypes.array,
    description: PropTypes.array
  }),
  fetchFavorites: PropTypes.func,
  removeAllFavorites: PropTypes.func
};

class FavoritesList extends Component {
  componentDidMount() {
    this.props.fetchFavorites();
  }
  render() {
    const { favorites, buoys } = this.props;
    let favoriteBuoyList = [];
    const hasData =
      buoys &&
      buoys.data &&
      buoys.data.rss &&
      buoys.data.rss.channel[0].item &&
      favorites.length > 0;
    if (hasData) {
      favoriteBuoyList = favorites.map(favoriteBuoy => {
        const favoriteBuoyData = buoys.data.rss.channel[0].item.filter(
          b => b.guid[0]['_'] === favoriteBuoy.id
        );
        if (favoriteBuoyData.length === 0) {
          this.props.removeAllFavorites();
          return null;
        } //The buoy IDs get reset every 24 hours, so I need to clear the DB if none match
        return (
          <Favorite
            key={favoriteBuoyData[0].guid[0]['_']}
            data={favoriteBuoyData}
          />
        );
      });
    }
    return favoriteBuoyList.length > 0 ? (
      <div id="favorites_container">
        <h4 id="favorites_title">Your Favorites</h4>
        <div id="favorites_list">{favoriteBuoyList}</div>
      </div>
    ) : null;
  }
}

FavoritesList.propTypes = propTypes;
export default FavoritesList;
