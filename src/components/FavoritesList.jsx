import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Favorite from './Favorite';

const propTypes = {
  favoriteBuoys: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.string,
        description: PropTypes.string
      })
    ),
    isFetching: PropTypes.bool,
    hasError: PropTypes.bool,
    inProgress: PropTypes.bool
  }),
  allBuoys: PropTypes.shape({
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
    const { favoriteBuoys, allBuoys } = this.props;
    let favoritesMap = [];
    const hasData =
      allBuoys &&
      allBuoys.data &&
      allBuoys.data.rss &&
      allBuoys.data.rss.channel[0].item &&
      favoriteBuoys.data.length > 0;
    if (hasData) {
      favoritesMap = favoriteBuoys.data.map(favoriteBuoy => {
        const favoriteBuoyData = allBuoys.data.rss.channel[0].item.filter(
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
    return favoritesMap.length > 0 ? (
      <div id="favorites_container">
        <div id="favorites_header">
          <h4 id="favorites_title">Your Favorites</h4>
        </div>
        <div id="favorites_list">{favoritesMap}</div>
        <button
          id="remove_favorites_button"
          onClick={this.props.removeAllFavorites}
        >
          Remove All Favorites
        </button>
      </div>
    ) : null;
  }
}

FavoritesList.propTypes = propTypes;
export default FavoritesList;
