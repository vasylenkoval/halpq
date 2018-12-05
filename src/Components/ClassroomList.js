import React, { Component } from 'react';

class ClassroomList extends Component {
  constructor() {
    console.log('the constructor in Classroom List was called');
    super();
    this.state = {};
  }
  render() {
    return <h2>This is the classroom list</h2>;
  }
}

export default ClassroomList;
