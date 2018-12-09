import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import StudentList from './StudentList';
import AdminList from './AdminList';

class UserManagement extends Component {
  constructor(props) {
    console.log('the constructor in User Management was called');
    super(props);
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

  componentWillUnmount() {
    const dbRef = firebase.database();
    dbRef.ref(`/Users`).off();
    dbRef.ref(`/Users/Admins/`).off();
    dbRef.ref(`/Users/Students/`).off();
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="returnLink">
            <Link to="/">Back to Classlist</Link>
          </div>
          <div className="users clearfix">
            <div className="users--list">
              <h2>students</h2>
              {this.state.studentList[0] ? (
                <StudentList students={this.state.studentList} />
              ) : (
                <p>There are no students</p>
              )}
            </div>
            <div className="users--list">
              <h2>admins</h2>
              {this.state.adminList[0] ? (
                <AdminList admins={this.state.adminList} />
              ) : (
                <p>There are no admins</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserManagement;
