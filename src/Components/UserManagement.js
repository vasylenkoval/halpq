import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import AdminList from './AdminList';
import StudentList from './StudentList';

class UserManagement extends Component {
  constructor() {
    console.log('the constructor in User Management was called');
    super();
    this.state = {};
  }

  // Includes Link to ClassroomList, List of students, list of admins.
  render() {
    return (
      <div>
        <Link>THIS IS A LINK TO THE CLASSROOMLIST COMPONENT</Link>
        <div className="studentList">
          <StudentList />
        </div>
        <div className="adminList">
          <AdminList />
        </div>
      </div>
    );
  }
}

export default UserManagement;
