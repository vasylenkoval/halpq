import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

class Halpq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      isAdmin: this.props.isAdmin,
      user: this.props.user,
    };
  }

  render() {
    return (
      <div>
        <div className="returnLink">
          <Link to="/">Return to Classrooms</Link>
        </div>
        <QuestionList
          classKey={this.props.match.params.classroomid}
          user={this.state.user}
          isAdmin={this.state.isAdmin}
        />
        <QuestionForm
          user={this.state.user}
          isAdmin={this.state.isAdmin}
          classKey={this.props.match.params.classroomid}
        />
      </div>
    );
  }
}

export default Halpq;
