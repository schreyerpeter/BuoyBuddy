import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Buoy from './Buoy';

const propTypes = {
  buoyData: PropTypes.shape({
    data: PropTypes.shape({
      rss: PropTypes.shape({
        channel: PropTypes.array
      })
    })
  })
};

class BuoyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      hasError: false
    };
  }
  componentDidMount() {
    this.props.fetchBuoys();
  }
  componentDidUpdate() {
    const { buoys } = this.props;
    if (
      this.state.dataSource.length === 0 &&
      buoys.data &&
      buoys.data.rss &&
      !buoys.hasError
    ) {
      this.setState({ dataSource: buoys.data.rss.channel[0].item });
    } else if (buoys.hasError) this.setState({ hasError: true });
  }
  handleClick = id => {
    const { favorites, addFavorite, removeFavorite } = this.props;
    const { dataSource } = this.state;
    if (favorites.indexOf(id) === -1) {
      const selectedFavorite = dataSource.filter(buoy => buoy.guid[0]['_'] === id)[0];
      console.log(selectedFavorite)
      addFavorite(selectedFavorite);
      return true;
    } else {
      removeFavorite(id);
      return false;
    }
  };
  render() {
    const buoysMap = this.state.dataSource.map(buoy => (
      <Buoy
        handleClick={this.handleClick}
        key={buoy.guid[0]['_']}
        buoyData={buoy}
      />
    ));
    return (
      <div id="buoys_container">
        {!this.state.hasError && (
          <div>
            <h4 id="buoys_title">
              Buoys within 100 nautical miles of 40°N, 73°W
            </h4>
            <div id="buoys_list_container">{buoysMap}</div>
          </div>
        )}
        {this.state.hasError && (
          <div>There was an error fetching your data.</div>
        )}
      </div>
    );
  }
}

BuoyList.propTypes = propTypes;
export default BuoyList;
