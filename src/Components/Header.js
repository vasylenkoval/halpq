import React, { Component } from 'react';

class Header extends Component {
  constructor() {
    console.log('the constructor in Header was called');
    super();
    this.state = {};
  }

  // Render will include sub components of H1, userManagementLink, user picture and logout button.
  render() {
    return (
      <div>
        <h1>henlo</h1>
      </div>
    );
  }
}

export default Header;
