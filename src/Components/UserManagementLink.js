import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserManagementLink extends Component {
  render() {
    return (
      <div className="userManagementLink">
        <Link to="/usermanagement">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 100 125"
            enableBackground="new 0 0 100 100"
            xmlSpace="preserve"
          >
            <path
              fill="#231f1f"
              d="M50,0C22.4,0,0,22.4,0,50s22.4,50,50,50s50-22.4,50-50S77.6,0,50,0z M50,19.4c3.8,0,7,3.1,7,7c0,3.8-3.1,7-7,7  c-3.8,0-7-3.1-7-7C43,22.5,46.2,19.4,50,19.4z M65.3,59.8c0,2.3-1.9,4.2-4.2,4.2c-0.3,0-0.8,0-1.4,0v8.4c0,5.4-4.4,8.4-9.8,8.4  s-9.8-3-9.8-8.4v-8.4c-0.6,0-1.1,0-1.4,0c-2.3,0-4.2-1.9-4.2-4.2c0-2.2,0-11.2,0-14.6c0-6.2,2.9-9.1,9.1-9.1c0.7,0,11.7,0,12.5,0  c6.2,0,9.1,2.9,9.1,9.1C65.3,48.5,65.3,57.5,65.3,59.8z"
            />
          </svg>
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
