import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Buoy from './Buoy';
import BuoyIcon from '../resources/buoy.ico';

const propTypes = {
  allBuoys: PropTypes.shape({
    data: PropTypes.shape({
      rss: PropTypes.shape({
        channel: PropTypes.array
      })
    }),
    hasError: PropTypes.bool,
    isFetching: PropTypes.bool
  }),
  favoriteBuoys: PropTypes.shape({
    data: PropTypes.array
  }),
  fetchBuoys: PropTypes.func,
  addFavorite: PropTypes.func,
  removeFavorite: PropTypes.func
};

class BuoyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChildId: null
    };
  }
  componentDidMount() {
    this.props.fetchBuoys();
  }
  handleClick = id => {
    const { favoriteBuoys, allBuoys, addFavorite, removeFavorite } = this.props;
    if (favoriteBuoys.data.filter(fav => fav.id === id).length === 0) {
      const selectedFavorite = allBuoys.data.rss.channel[0].item.filter(
        buoy => buoy.guid[0]['_'] === id
      )[0];
      addFavorite(selectedFavorite);
      return true;
    } else {
      removeFavorite(id);
      return false;
    }
  };
  handleMouseEnter = id => {
    this.setState({ selectedChildId: id });
  };
  handleMouseLeave = () => {
    this.setState({ selectedChildId: null });
  };
  render() {
    const { allBuoys, favoriteBuoys } = this.props;
    let buoysMap = [];
    const hasData =
      allBuoys &&
      allBuoys.data &&
      allBuoys.data.rss &&
      allBuoys.data.rss.channel[0] &&
      favoriteBuoys &&
      favoriteBuoys.data;
    if (hasData) {
      buoysMap = allBuoys.data.rss.channel[0].item.map(buoy => {
        const buoyProps = {
          handleMouseEnter: this.handleMouseEnter,
          handleMouseLeave: this.handleMouseLeave,
          handleClick: this.handleClick,
          key: buoy.guid[0]['_'],
          buoyData: buoy,
          isSelected: buoy.guid[0]['_'] === this.state.selectedChildId,
          isFavorite:
            favoriteBuoys.data.filter(b => b.id === buoy.guid[0]['_']).length >
            0,
          inProgress: favoriteBuoys.inProgress
        };
        return <Buoy {...buoyProps} />;
      });
    }

    return (
      <div id="buoys_container">
        <h4 id="buoys_title">Buoys within 100 nautical miles of 40°N, 73°W</h4>
        {allBuoys.isFetching && (
          <img src={BuoyIcon} alt="Loading Icon" className="loading" />
        )}
        {!allBuoys.hasError &&
          !allBuoys.isFetching && (
            <div id="buoys_list_container">{buoysMap}</div>
          )}
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
