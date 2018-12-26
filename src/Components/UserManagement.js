import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import StudentList from "./StudentList";
import AdminList from "./AdminList";
import backChevron from "../assets/back-chevron.svg";

class UserManagement extends Component {
  constructor(props) {
    console.log("the constructor in User Management was called");
    super(props);
    this.state = {
      studentList: [],
      adminList: [],
      studentCount: 0,
      adminCount: 0
    };
  }

  componentDidUpdate() {}

  componentDidMount() {
    const dbRef = firebase.database();
    dbRef.ref(`/Users`).on("value", () => {});
    dbRef.ref(`/Users/Students/`).on("value", (snapshot) => {
      if (!snapshot.exists()) {
        this.setState({ studentList: [] });
      } else if (snapshot.val()) {
        const newstudentList = snapshot.val();
        const studentList = Object.entries(newstudentList).sort();
        const studentCount = Object.entries(newstudentList).length;
        this.setState({ studentList, studentCount });
      }
    });
    dbRef.ref(`/Users/Admins/`).on("value", (snapshot) => {
      if (!snapshot.exists()) {
        this.setState({ adminList: [] });
      } else if (snapshot.val()) {
        const myadminList = snapshot.val();
        const adminList = Object.entries(myadminList).sort();
        const adminCount = Object.entries(myadminList).length;
        this.setState({ adminList, adminCount });
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
      <div className="userManagement">
        <div className="wrapper">
          <div className="Component__Title">
            <h2>User Management</h2>
          </div>
          <Link className="backLink" to="/">
            <div className="returnLink clearfix">
              <div className="returnLink__img">
                <img src={backChevron} alt="back arrow" />
              </div>
              <p>Back to Classlist</p>
            </div>
          </Link>
          <div className="users clearfix">
            <div className="users__panel">
              <h3 className="users__panelTitle users__panelTitle--admin">
                Admins
              </h3>
              <span className="users__count">({this.state.adminCount})</span>
              {this.state.adminList[0] ? (
                <AdminList admins={this.state.adminList} />
              ) : (
                <p className="noAdmin">There are no admins</p>
              )}
            </div>
            <div className="users__panel">
              <h3 className="users__panelTitle">Students</h3>
              <span className="users__count">({this.state.studentCount})</span>
              {this.state.studentList[0] ? (
                <StudentList students={this.state.studentList} />
              ) : (
                <p>There are no students</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserManagement;
