import React, { Component } from 'react';
import firebase from 'firebase';

class DeleteQuestion extends Component {
  deleteQuestion = (classroomRef, questionRef) => {
    const deleteRef = firebase
      .database()
      .ref(`Archive/${classroomRef}/${questionRef}`);
    deleteRef.remove();
  };

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            this.deleteQuestion(this.props.classKey, this.props.questionKey);
          }}
        >
          DELETE QUESTION
        </button>
      </div>
    );
  }
}

export default DeleteQuestion;
