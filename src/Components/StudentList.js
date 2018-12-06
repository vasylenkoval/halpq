import React, { Component } from 'react';
import { makeAdmin } from './globalFunctions';

class StudentList extends Component {
  render() {
    return (
      // map list of students on firebase:

      <div className="student">
        {this.props.students.map(student => (
          <div key={student[0]} className="studentInfo">
            <h3>{student[1].displayName}</h3>
            <p>{student[1].email}</p>
            <button
              type="button"
              onClick={() => {
                makeAdmin(`${student[0]}`);
              }}
            >
              CLICK ME
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default StudentList;
