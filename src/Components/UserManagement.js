import React, { Component } from 'react';
import firebase from 'firebase';
import StudentList from './StudentList';
import AdminList from './AdminList';

class UserManagement extends Component {
  constructor() {
    console.log('the constructor in User Management was called');
    super();
    this.state = {
      studentList: [],
      adminList: [],
    };
  }

  componentDidMount() {
    const dbRef = firebase.database();
    dbRef.ref(`/Users`).on('value', () => {});
    dbRef.ref(`/Users/Students/`).on('value', snapshot => {
      if (!snapshot.exists()) {
        this.setState({ studentList: [] });
      } else if (snapshot.val()) {
        const newstudentList = snapshot.val();
        const studentList = Object.entries(newstudentList);
        this.setState({ studentList });
      }
    });
    dbRef.ref(`/Users/Admins/`).on('value', snapshot => {
      if (!snapshot.exists()) {
        this.setState({ adminList: [] });
      } else if (snapshot.val()) {
        const myadminList = snapshot.val();
        const adminList = Object.entries(myadminList);
        this.setState({ adminList });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="returnLink">link</div>
        <div className="users">
          <div className="studentList">
            <h2>students</h2>
            {this.state.studentList[0] ? (
              <StudentList students={this.state.studentList} />
            ) : (
              <p>There are no students</p>
            )}
          </div>
          <div className="adminList">
            <h2>admins</h2>
            {this.state.adminList[0] ? (
              <AdminList admins={this.state.adminList} />
            ) : (
              <p>There are no admins</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UserManagement;
