import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Buoy from './Buoy';

const propTypes = {
  allBuoys: PropTypes.shape({
    data: PropTypes.shape({
      rss: PropTypes.shape({
        channel: PropTypes.array
      })
    })
  }),
  hasError: PropTypes.bool,
  isFetching: PropTypes.bool,
  fetchBuoys: PropTypes.func,
  addFavorite: PropTypes.func,
  removeFavorite: PropTypes.func
};

class BuoyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }
  componentDidMount() {
    this.props.fetchBuoys();
  }
  componentDidUpdate() {
    const { allBuoys } = this.props;
    if (
      this.state.dataSource.length === 0 &&
      allBuoys.data &&
      allBuoys.data.rss &&
      !allBuoys.hasError
    ) {
      this.setState({ dataSource: allBuoys.data.rss.channel[0].item });
    }
  }
  handleClick = id => {
    const { favoriteBuoys, addFavorite, removeFavorite } = this.props;
    const { dataSource } = this.state;
    if (favoriteBuoys.data.filter(fav => fav.id === id).length === 0) {
      const selectedFavorite = dataSource.filter(
        buoy => buoy.guid[0]['_'] === id
      )[0];
      addFavorite(selectedFavorite);
      return true;
    } else {
      removeFavorite(id);
      return false;
    }
  };
  render() {
    const { allBuoys, favoriteBuoys } = this.props;
    const buoysMap = this.state.dataSource.map(buoy => {
      const isFavorite =
        favoriteBuoys.data.filter(b => b.id === buoy.guid[0]['_']).length > 0;
      return (
        <Buoy
          handleClick={this.handleClick}
          key={buoy.guid[0]['_']}
          buoyData={buoy}
          isFavorite={isFavorite}
          inProgress={favoriteBuoys.inProgress}
        />
      );
    });
    return (
      <div id="buoys_container">
        <h4 id="buoys_title">Buoys within 100 nautical miles of 40°N, 73°W</h4>
        {allBuoys.isFetching && <div id="buoys_fetching">Loading...</div>}
        {!allBuoys.hasError &&
          !allBuoys.isFetching && <div id="buoys_list_container">{buoysMap}</div>}
        {allBuoys.hasError && (
          <div id="buoys_error">
            There was an error fetching your data - please refresh your browser.
          </div>
        )}
      </div>
    );
  }
}

BuoyList.propTypes = propTypes;
export default BuoyList;
