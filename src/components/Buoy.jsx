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
    handleHover = (id) => {
        this.props.handleHover(id);
    }
    render() {
        const { buoyData } = this.props;
        return (
            <li>
                <div className='buoy' style={{width: '100%'}} onMouseEnter={this.handleHover.bind(this, buoyData.guid[0]['_'])}>{buoyData.title[0]}</div>
                {false && <div>{ReactHtmlParser(buoyData.description[0])}</div>}
            </li>
        )
    }
}

Buoy.propTypes = propTypes;
export default Buoy;