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
    const { favorites } = this.props;
    if (favorites.indexOf(id) === -1) {
      this.props.addFavorite(id);
      return true;
    } else {
      this.props.removeFavorite(id);
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
      <div>
        {!this.state.hasError && (
          <div id="buoy_list">
            <h4>Buoys within 100 nautical miles of 40°N, 73°W</h4>
            <ul>{buoysMap}</ul>
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
