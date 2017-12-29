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
}

class Buoy extends Component {
    render() {
        const { buoyData } = this.props;
        return (
            <div>
                <p>{buoyData.title[0]}</p>
                <div>{ReactHtmlParser(buoyData.description[0])}</div>
            </div>
        )
    }
}

Buoy.propTypes = propTypes;
export default Buoy;