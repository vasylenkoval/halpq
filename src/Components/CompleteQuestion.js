import React, { Component } from 'react';
import firebase from 'firebase';
import markComplete from '../assets/mark-complete.svg';

class CompleteQuestion extends Component {
  archiveQuestion = (classroomRef, questionRef) => {
    const currRef = firebase
      .database()
      .ref(`/Questions/${classroomRef}/${questionRef}`);
    const archiveRef = firebase
      .database()
      .ref(`Archive/${classroomRef}/${questionRef}`);
    currRef.once('value', snapshot => {
      archiveRef.set(snapshot.val());
      currRef.remove();
    });
  };

  render() {
    return (
      <div className="completeQuestion clearfix">
        <button
          type="button"
          onClick={() => {
            this.archiveQuestion(this.props.classKey, this.props.questionKey);
          }}
        >
          <div className="buttonImage">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              space="preserve"
              version="1.1"
              viewBox="0 0 326 407.5"
              x="0px"
              y="0px"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <defs />
              <g>
                <path
                  fill="black"
                  d="M163 0c90,0 163,73 163,163 0,90 -73,163 -163,163 -90,0 -163,-73 -163,-163 0,-90 73,-163 163,-163zm-5 237c-11,11 -27,9 -37,-3l-64 -64c-23,-23 12,-58 35,-35l49 48 93 -93c23,-23 59,12 35,35l-111 112z"
                />
              </g>
            </svg>
          </div>
          <p>Mark Complete</p>
        </button>
      </div>
    );
  }
}

export default CompleteQuestion;
