import React from 'react';

// Classroom item inside of the Classroom List
const ClassroomListItem = props => (
  <div className="classroomlist__item">
    <div className="classroomlist__item__name">
      <h2>{props.classroomName}</h2>
    </div>

    <div className="classroomlist__item__questions">
      <div className="classroomlist__item__questions__count">
        <p>Active questions: to be passed</p>
      </div>
    </div>

    <div className="classroomlist__item__beinghelped">
      <div className="classroomlist__item__beinghelped__count">
        <p>Being helped questions: to be passed</p>
      </div>
    </div>

    <div className="clasroom__item__password">
      <p>Password: {props.password}</p>
    </div>

    <div className="classroomlist__item__studentsEnrolled">
      <p>Number of Students: {props.studentCount}</p>
    </div>
    <button>Enter</button>
  </div>
);

export default ClassroomListItem;
