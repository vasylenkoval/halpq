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
        <form
          action="#"
          onSubmit={this.handleSubmit}
          className="questionForm__desktop"
        >
          <label
            htmlFor="question"
            className="questionForm__label visuallyhidden"
          >
            Question
          </label>
          <textarea
            className="questionForm__input questionForm__questionArea"
            value={this.state.question}
            onChange={this.handleChange}
            name="question"
            id="question"
            placeholder="Enter your question here..."
            cols="36"
            rows="6"
            minLength={1}
            resize="false"
          />
          <label
            htmlFor="location"
            className="questionForm__label visuallyhidden"
          >
            >Location
          </label>
          <input
            required
            className="questionForm__input"
            value={this.state.location}
            onChange={this.handleChange}
            type="text"
            name="location"
            id="location"
            minLength={1}
            placeholder="Enter your location at HackerYou"
          />
          <label
            htmlFor="submit"
            className="questionForm__label visuallyhidden"
          >
            Submit
          </label>
          <input
            type="submit"
            id="submit"
            value="Submit"
            className="questionForm__submit"
          />
        </form>
        {/* Show when window size is below 750px's */}
        <button
          type="button"
          className="questionForm__addbutton"
          onClick={this.handleClick}
          name="addQuestion"
        >
          ＋
        </button>
        {this.state.activateForm ? (
          <div className="questionForm__mobileWrapper">
            <form
              className="questionForm__mobileInner"
              onSubmit={this.conditionalAction}
              autoComplete="off"
            >
              <textarea
                className="questionForm__input questionForm__questionArea"
                value={this.state.question}
                onChange={this.handleChange}
                name="question"
                id="question"
                placeholder="Enter your question here..."
                cols="36"
                rows="6"
                minLength={1}
                resize="false"
              />
              <input
                className="questionForm__input"
                type="text"
                min
                placeholder="Enter location"
                id="location"
                onChange={this.handleChange}
                value={this.state.location}
                minLength={1}
              />
              <button
                className="questionForm__submit"
                id="submit"
                type="submit"
              >
                {'Submit'}
              </button>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

export default QuestionForm;
