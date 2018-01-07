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
  isFavorite: PropTypes.bool,
  inProgress: PropTypes.bool
};

class Buoy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      isFavorite: props.isFavorite
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      isFavorite: nextProps.isFavorite
    });
  }
  handleClick = id => {
    this.setState({ isFavorite: this.props.handleClick(id) });
  };
  handleMouseEnter = () => {
    this.setState({
      isSelected: true
    });
  };
  handleMouseLeave = () => {
    this.setState({
      isSelected: false
    });
  };
  render() {
    const { buoyData, inProgress } = this.props;
    const { isFavorite, isSelected } = this.state;
    const buttonText = isFavorite
      ? 'Remove from Favorites'
      : 'Add to Favorites';
    const className = `buoy-item-title${isFavorite ? '-favorite' : ''}`;
    const selectedElementContents = inProgress ? (
      <img className="loading" alt="Loading Icon" src={BuoyIcon} />
    ) : (
      <button
        className="favorite-button"
        onClick={this.handleClick.bind(this, buoyData.guid[0]['_'])}
      >
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
