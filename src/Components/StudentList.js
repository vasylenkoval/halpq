import React, { Component } from 'react';
import { nakeStudent, makeStudent } from './globalFunctions';

class StudentList extends Component {
  render() {
    return (
      // map list of students on firebase:
      <div className="student">
        <div className="studentInfo">
          <h3>Student Name</h3>
          <p>Student Email</p>
        </div>
        <button type="button" onClick={makeStudent(PLACEHOLDER_FOR_ID)}>
          CLICK ME
        </button>
      </div>
    );
  }
}

export default StudentList;
