import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  description: PropTypes.arrayOf(PropTypes.string),
  'georss:point': PropTypes.arrayOf(PropTypes.string),
  guid: PropTypes.arrayOf(PropTypes.string),
  link: PropTypes.arrayOf(PropTypes.string),
  pubDate: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.arrayOf(PropTypes.string)
};

class Buoy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      favorite: false
    };
  }
  handleClick = id => {
    this.setState({ favorite: this.props.handleClick(id) });
  };
  handleMouseEnter = () => {
    this.setState({
      selected: true
    });
  };
  handleMouseLeave = () => {
    this.setState({
      selected: false
    });
  };
  render() {
    const { buoyData } = this.props;
    const { favorite, selected } = this.state;
    const buttonText = favorite ? 'Remove from Favorites' : 'Add to Favorites';
    return (
      <div
        className="buoy-item"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={`buoy-item-title${favorite ? '-favorite' : ''}`}>
          {buoyData.title[0]}
        </div>
        <div className="button-container">
          {selected && (
            <button
              className="favorite-button"
              onClick={this.handleClick.bind(this, buoyData.guid[0]['_'])}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    );
  }
}

Buoy.propTypes = propTypes;
export default Buoy;
