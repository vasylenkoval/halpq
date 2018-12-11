import React, { Component } from 'react';
import firebase from 'firebase';

class QuestionForm extends Component {
  constructor() {
    super();
    this.state = {
      question: '',
      location: '',
      activateForm: false,
    };
  }

  createQuestion = (questionRef, questionContent, userLocation) => {
    const dbRef = firebase.database();
    dbRef.ref(`/Questions/${questionRef}`).push({
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

  handleClick = e => {
    const { activateForm } = this.state;
    if (activateForm) {
      this.setState({
        activateForm: false,
      });
    } else {
      this.setState({
        activateForm: true,
      });
    }
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
      <div className="questionForm">
        <form action="#" onSubmit={this.handleSubmit}>
          <label htmlFor="question" className="visuallyhidden">
            Question
          </label>
          <textarea
            value={this.state.question}
            onChange={this.handleChange}
            name="question"
            id="question"
            placeholder="Enter your question here..."
            cols="36"
            rows="6"
            minLength={1}
          />
          <label htmlFor="location" className="visuallyhidden">
            >Location
          </label>
          <input
            required
            value={this.state.location}
            onChange={this.handleChange}
            type="text"
            name="location"
            id="location"
            minLength={1}
            placeholder="Enter your location at HackerYou"
          />
          <input type="submit" />
        </form>
        {/* Show when window size is below 750px's */}
        {this.state.activateForm ? (
          <div className="question__form__backdrop" />
        ) : null}
        <button
          type="button"
          className="question__addbutton"
          onClick={this.handleClick}
          name="addQuestion"
        >
          ＋
        </button>
        {this.state.activateForm ? (
          <form
            className="question__form"
            onSubmit={this.conditionalAction}
            autoComplete="off"
          >
            <input
              className="question__form__input"
              type="text"
              min
              placeholder="Enter question here"
              id="conditional-input"
              onChange={this.handleChange}
              value={this.state.question}
              minLength={1}
            />
            <input
              className="question__form__input"
              type="text"
              min
              placeholder="Enter location"
              id="conditional-input"
              onChange={this.handleChange}
              value={this.state.question}
              minLength={1}
            />
            <button className="question__form__submit" type="submit">
              {'New question'}
            </button>
          </form>
        ) : null}
      </div>
    );
  }
}

export default QuestionForm;
