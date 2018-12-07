import React, { Component } from 'react';
import HeaderTitle from './HeaderTitle';
import UserManagementLink from './UserManagementLink';
import UserDetails from './UserDetails';

const Header = props => (
  <div style={HeaderStyle} className="Header">
    <div className="Header--Logo" style={HeaderLogoStyle}>
      <svg viewBox="0 0 93.21 93" xmlns="http://www.w3.org/2000/svg">
        <path d="m0 93h93v-93h-93z" fill="#d11f26" />
        <g fill="#fff">
          <path d="m40 65h29v-5h-29z" />
          <path d="m24.76 26 17.24 16.98-17.3 17.02-3.7-3.58 13.64-13.39-13.64-13.34z" />
        </g>
      </svg>
    </div>
    <HeaderTitle
      strings={[
        'Some <i>strings</i> are slanted',
        'Some <strong>strings</strong> are bold',
        'HTML characters &times; &copy;',
      ]}
    />
    {props.user !== null ? (
      <div className="UserPanelStyle clearfix">
        <h2 style={UserNameText} className="clearfix">
          Welcome {props.user.displayName}
        </h2>
        <img style={UserImage} src={props.user.photoURL} alt="" />
        <UserManagementLink isAdmin={props.isAdmin} />
        {/* <UserDetails userPhoto={props.photoURL} /> */}
      </div>
    ) : null}
  </div>
);
const HeaderStyle = {
  width: '100%',
  display: 'inline-block',
};

const UserPanelStyle = {
  float: 'right',
  display: 'inline-block',
};
const UserImage = {
  width: '60px',
  float: 'right',
  'border-radius': '50%',
  display: 'inline-block',
};
const UserNameText = {
  'text-align': 'right',
  float: 'right',
  display: 'inline-block',
};
const HeaderLogoStyle = {
  width: '94px',
  display: 'inline-block',
};

export default Header;
