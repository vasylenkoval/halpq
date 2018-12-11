import React, { Component } from 'react';
import firebase from 'firebase';
import beingHelpedIcon from '../assets/beingHelpedIcon.svg';

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
          <img src="{beingHelpedIcon}" alt="" />
        </button>
      </div>
    );
  }
}

export default BeingHelped;
