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
    const { buoyData } = this.props;
    if (this.state.dataSource.length === 0 && buoyData.buoys.data && buoyData.buoys.data.rss && buoyData.buoys.hasError === false) {
      this.setState({ dataSource: buoyData.buoys.data.rss.channel[0].item });
    } else if (buoyData.buoys.hasError === true) this.setState({hasError: true})
  }
  render() {
    const buoysMap = this.state.dataSource.map(buoy => <Buoy key={buoy.guid[0]['_']} buoyData={buoy} />);
    return (
        <div>
            {!this.state.hasError && buoysMap}
            {this.state.hasError && <div>There was an error fetching your data.</div>}
        </div>
    );
  }
}

BuoyList.propTypes = propTypes;
export default BuoyList;
