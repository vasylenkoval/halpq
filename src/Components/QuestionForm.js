import react, { Component } from 'react';

class QuestionForm extends Component {
  constructor() {
    super();
    this.setState = {};
  }

  render() {
    return (
      <div>
        <h3>Ask your question</h3>
        <form action="#">
          <label htmlFor="question">Question</label>
          <input type="text" name="question" id="question" />
          <label htmlFor="location">Location</label>
          <input type="text" name="location" id="location" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
