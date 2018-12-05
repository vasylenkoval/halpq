import React, { Component } from 'react';

class UserManagement extends Component {
  constructor() {
    console.log('the constructor in User Management was called');
    super();
    this.state = {};
  }

  render() {
    return <h2>This is the user management component</h2>;
  }
}

export default UserManagement;
