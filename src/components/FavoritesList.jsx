import React, { Component } from 'react';

class FavoritesList extends Component {
  render() {
    const { favorites } = this.props;
    const favoriteBuoys = favorites.map(buoy => <div>{buoy}</div>);
    return <div>{favoriteBuoys}</div>;
  }
}

export default FavoritesList;
