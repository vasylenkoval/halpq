import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderTitle from './HeaderTitle';
import UserManagementLink from './UserManagementLink';
import UserDetails from './UserDetails';
// import Context from './Components/Context';

class Header extends Component {
  constructor() {
    console.log('the constructor was called');
    super();
    this.state = {};
  }

  render() {
    return (
      <div style={HeaderStyle} className="Header">
        <div className="Header--Logo" style={HeaderLogoStyle}>
          <Link to="/">
            <svg viewBox="0 0 93.21 93" xmlns="http://www.w3.org/2000/svg">
              <path d="m0 93h93v-93h-93z" fill="#d11f26" />
              <g fill="#fff">
                <path d="m40 65h29v-5h-29z" />
                <path d="m24.76 26 17.24 16.98-17.3 17.02-3.7-3.58 13.64-13.39-13.64-13.34z" />
              </g>
            </svg>
          </Link>
        </div>
        <HeaderTitle />
        {this.props.user !== null ? (
          <div className="UserPanelStyle clearfix">
            {/* <img style={UserImage} src={props.user.photoURL} alt="" /> */}
            {this.props.isAdmin && <UserManagementLink />}
            <UserDetails
              photoURL={this.props.user.photoURL}
              displayName={this.props.user.displayName}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
const HeaderStyle = {
  width: '100%',
  display: 'inline-block',
};

const UserPanelStyle = {
  float: 'right',
  display: 'inline-block',
};

const HeaderLogoStyle = {
  width: '94px',
  display: 'inline-block',
};

export default Header;
