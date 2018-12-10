import React from 'react';

// Classroom item inside of the Classroom List
const ClassroomListItem = props => {
  const { classroomName, password, studentCount, isDisabled } = props;
  return (
    <div
      className={
        isDisabled
          ? 'classroomlist__item clearfix classroomlist__disabled'
          : 'classroomlist__item clearfix'
      }
    >
      <div className="classroomlist__item__name">
        <h3>{classroomName}</h3>
      </div>

      {isDisabled ? <div className="disabled__text"> Disabled</div> : null}

      <div className="classroomlist__item__questions">
        <div className="classroomlist__item__questions__count">
          <span className="highlighted">Active questions:</span> to be passed
        </div>
      </div>

      <div className="classroomlist__item__password">
        <div>
          <span className="highlighted">Code:</span> {password}
        </div>
      </div>

      <div className="classroomlist__item__studentsEnrolled">
        <span className="highlighted">Students:</span>{' '}
        <span className="number">{studentCount}</span>
      </div>
    </div>
  );
};

export default ClassroomListItem;
