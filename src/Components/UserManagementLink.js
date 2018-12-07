import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserMgmtLogo from '../assets/UserMgmtIcon.png';

class UserManagementLink extends Component {
  render() {
    return (
      <div>
        <Link to="/usermanagement">
          <img
            style={userMgmt}
            src={UserMgmtLogo}
            alt="User Managment Panel Icon"
          />
        </Link>
      </div>
    );
  }
}

const userMgmt = {
  width: '70px',
  float: 'right',
};

export default UserManagementLink;
