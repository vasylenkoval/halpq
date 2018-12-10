import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import StudentList from './StudentList';
import AdminList from './AdminList';
import backChevron from '../assets/back-chevron.svg';

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
    return <div className="userManagement">
        <div className="wrapper">
          <div className="Component__Title">
            <h2>User Management</h2>
          </div>
          <Link to="/">
            <div className="returnLink clearfix">
              <div className="returnLink__img">
                <img src={backChevron} alt="" />
              </div>
              <p>Back to Classlist</p>
            </div>
          </Link>
          <div className="users clearfix">
            <div className="users__panel">
              <h3 className="users__panelTitle">Students</h3>
              {this.state.studentList[0] ? <StudentList students={this.state.studentList} /> : <p>
                  There are no students
                </p>}
            </div>
            <div className="users__panel">
              <h3 className="users__panelTitle users__panelTitle--admin">
                Admins
              </h3>
              {this.state.adminList[0] ? <AdminList admins={this.state.adminList} /> : <p>
                  There are no admins
                </p>}
            </div>
          </div>
        </div>
      </div>;
  }
}

export default UserManagement;
