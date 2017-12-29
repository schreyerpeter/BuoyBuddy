import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      dataSource: []
    };
  }
  componentDidMount() {
    this.props.fetchBuoys();
  }
  componentDidUpdate() {
    const { buoyData } = this.props;
    if (this.state.dataSource.length === 0 && buoyData.buoys.data.rss) {
      this.setState({ dataSource: buoyData.buoys.data.rss.channel[0].item });
    }
  }
  render() {
    const buoysMap = this.state.dataSource.map(buoy => (
      <div key={buoy.guid[0]['_']}>{buoy.title[0]}</div>
    ));
    return buoysMap;
  }
}

BuoyList.propTypes = propTypes;
export default BuoyList;
