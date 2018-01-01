import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.array,
      description: PropTypes.array,
      guid: PropTypes.array
    }))
};

class Favorite extends Component {
  render() {
    const { data, buoy } = this.props;
    return (
      <div className="favorite" key={buoy}>
        <div>
          <span className="bold">Name: </span>
          {data[0].title}
        </div>
        <div>
          <span className="bold">ID: </span>
          {data[0].guid[0]['_']}
        </div>
        <div>{ReactHtmlParser(data[0].description[0])}</div>
      </div>
    );
  }
}

Favorite.propTypes = propTypes;
export default Favorite;