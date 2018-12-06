import React, { Component } from 'react';
import HeaderTitle from './HeaderTitle';

class Header extends Component {
  constructor() {
    console.log('the constructor in Header was called');
    super();
    this.state = {};
  }

  render() {
    return (
      <div style={HeaderStyle} className="Header">
        <div className="HeaderLogo" style={HeaderLogoStyle}>
          <svg viewBox="0 0 93.21 93" xmlns="http://www.w3.org/2000/svg">
            <path d="m0 93h93v-93h-93z" fill="#d11f26" />
            <g fill="#fff">
              <path d="m40 65h29v-5h-29z" />
              <path d="m24.76 26 17.24 16.98-17.3 17.02-3.7-3.58 13.64-13.39-13.64-13.34z" />
            </g>
          </svg>
        </div>
        <HeaderTitle />
      </div>
    );
  }
}

const HeaderStyle = {
  width: '100%',
  display: 'inline-block',
};
const HeaderLogoStyle = {
  width: '94px',
  float: 'left',
};

export default Header;


