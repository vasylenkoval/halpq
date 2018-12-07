import React, { Component } from 'react';

class QuestionForm extends Component {
  constructor() {
    super();
    this.state = {
      question: '',
      location: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.question = this.state.question;
    this.location = this.state.location;
    this.classKey = this.props.classKey;
    console.log("Q Details:", this.question, this.location, this.classKey);
    this.setState({
      question: '',
      location: '',
    });
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
