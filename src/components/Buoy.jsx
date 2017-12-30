import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

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
      favorited: false
    };
  }
  handleClick = id => {
    this.setState({ favorited: this.props.handleClick(id) });
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
    const buttonText = this.state.favorited
      ? 'Remove from Favorites'
      : 'Add to Favorites';
    return (
      <li
        className="buoy-item"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="buoy-title">{buoyData.title[0]}</div>
        {this.state.selected && (
          <button
            className="favorite-button"
            onClick={this.handleClick.bind(this, buoyData.guid[0]['_'])}
          >
            {buttonText}
          </button>
        )}
        {false && <div>{ReactHtmlParser(buoyData.description[0])}</div>}
      </li>
    );
  }
}

Buoy.propTypes = propTypes;
export default Buoy;
