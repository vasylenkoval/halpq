import React, { Component } from 'react';
import firebase from 'firebase';

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
      <div>
        <button
          type="button"
          onClick={() => {
            this.archiveQuestion(this.props.classKey, this.props.questionKey);
          }}
        >
          COMPLETE QUESTION
        </button>
      </div>
    );
  }
}

export default CompleteQuestion;
