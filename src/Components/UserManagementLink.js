import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import user from '../assets/user.svg';


class UserManagementLink extends Component {
  render() {
    return (
      <div className="userManagementLink">
        <Link to="/usermanagement">
          <img style={userMgmt} src={user} alt="User Managment Panel Icon" />
        </Link>
      </div>
    );
  }
}

const userMgmt = {
  width: '40px',
  // height: '40px',
  // float: 'right',
};

export default UserManagementLink;
