import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BuoyIcon from '../resources/buoy.ico';

const propTypes = {
  buoyData: PropTypes.shape({
    description: PropTypes.arrayOf(PropTypes.string),
    'georss:point': PropTypes.arrayOf(PropTypes.string),
    guid: PropTypes.arrayOf(
      PropTypes.shape({
        _: PropTypes.string
      })
    ),
    link: PropTypes.arrayOf(PropTypes.string),
    pubDate: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.arrayOf(PropTypes.string)
  }),
  handleClick: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  handleMouseEnter: PropTypes.func,
  isFavorite: PropTypes.bool,
  inProgress: PropTypes.bool,
  isSelected: PropTypes.bool
};

class Buoy extends Component {
  handleClick = () => {
    this.props.handleClick(this.props.buoyData.guid[0]['_']);
  };
  handleMouseEnter = () => {
    this.props.handleMouseEnter(this.props.buoyData.guid[0]['_']);
  };
  handleMouseLeave = () => {
    this.props.handleMouseLeave(this.props.buoyData.guid[0]['_']);
  };
  render() {
    const { buoyData, inProgress, isSelected, isFavorite } = this.props;
    const buttonText = isFavorite ? 'Remove Favorite' : 'Add Favorite';
    const className = `buoy-item-title${isFavorite ? '-favorite' : ''}`;
    const selectedElementContents = inProgress ? (
      <img className="loading" alt="Loading Icon" src={BuoyIcon} />
    ) : (
      <button className="favorite-button" onClick={this.handleClick}>
        {buttonText}
      </button>
    );
    return (
      <div
        className="buoy-item"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={className}>{buoyData.title[0]}</div>
        <div className="button-container">
          {isSelected && selectedElementContents}
        </div>
      </div>
    );
  }
}

Buoy.propTypes = propTypes;
export default Buoy;
