import React, { Component } from "react";
import firebase from "firebase";
import beingHelped from "../assets/being-helped.svg";

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
          <div className="buttonImage beingHelped__active" />
          <img src={beingHelped} alt="" />
        </button>
      </div>
    );
  }
}

export default BeingHelped;
