import React, { Component } from 'react';
import firebase from 'firebase';

class QuestionForm extends Component {
  constructor() {
    super();
    this.state = {
      question: '',
      location: '',
    };
  }

  createQuestion = (classroomRef, questionContent, userLocation) => {
    const dbRef = firebase.database();
    dbRef.ref(`/Questions/${classroomRef}`).push({
      name: this.props.user.displayName,
      content: questionContent,
      uid: this.props.user.uid,
      photoURL: this.props.user.photoURL,
      dateCreated: +new Date(),
      dateHelped: 0,
      dateCompleted: 0,
      isCompleted: false,
      location: userLocation,
      whoHelped: 0,
      isBeingHelped: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const question = this.state.question;
    const location = this.state.location;
    const classKey = this.props.classKey;
    if (
      /^\s+$/.test(this.state.question) ||
      /^\s+$/.test(this.state.location)
    ) {
      this.setState({
        question: '',
        location: '',
      });
    } else {
      this.createQuestion(classKey, question, location);
      this.setState({
        question: '',
        location: '',
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <h3>---Ask your question---</h3>
        <form action="#" onSubmit={this.handleSubmit}>
          <label htmlFor="question">Question</label>
          <input
            value={this.state.question}
            onChange={this.handleChange}
            type="text"
            name="question"
            id="question"
          />
          <label htmlFor="location">Location</label>
          <input
            required
            value={this.state.location}
            onChange={this.handleChange}
            type="text"
            name="location"
            id="location"
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default QuestionForm;
