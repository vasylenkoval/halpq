import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

class Halpq extends Component {
  constructor() {
    super();
    this.state = {
         questions: [],
    };
  }

  render() {
    return <div>
        <div className="returnLink">
          <Link to="/">Return to Classrooms</Link>
        </div>
        <QuestionList classKey={this.props.match.params.classroomid} />
        <QuestionForm user={this.props.user} classKey={this.props.match.params.classroomid} />
      </div>;
  }
}

export default Halpq;
