import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserManagement from './UserManagement';

class UserManagementLink extends Component {
  render() {
    return <div>
        <Link to="/usermanagement">
            BOO<img src="" alt="ICON (EVENTUALLY)" />
        
        
        </Link>
      </div>  
  }
}

export default UserManagementLink;
