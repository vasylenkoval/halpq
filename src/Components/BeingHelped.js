import React, { Component } from "react";
import firebase from "firebase";

class BeingHelped extends Component {
  beingHelped = (classroomRef, questionRef) => {
    const question = firebase
      .database()
      .ref(`/Questions/${classroomRef}/${questionRef}/isBeingHelped`);
    question.set(true);
  };

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            this.beingHelped(this.props.classKey, this.props.questionKey);
          }}
        >
          MARKE AS BEING HELPED
        </button>
      </div>
    );
  }
}

export default BeingHelped;
