import React, { Component } from 'react';
import { makeAdmin } from './globalFunctions';
import arrow from '../assets/arrow-right.svg';

class StudentList extends Component {
  render() {
    return (
      // map list of students on firebase:

      <div className="userList">
        {this.props.students.map(student => (
          <div key={student[0]} className="userList__user student clearfix">
            <div className="user__details">
              <h3>{student[1].displayName}</h3>
              <p>{student[1].email}</p>
            </div>
            <div className="user__action">
              <button className="user__button"
                type="button"
                onClick={() => {
                  makeAdmin(`${student[0]}`);
                }}
              >
                Baller-ize
                <div className="buttonImage">
                  <img src={arrow} alt="make user a student" />
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default StudentList;
