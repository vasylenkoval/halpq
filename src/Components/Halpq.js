import React, { Component } from 'react';
// import firebase from 'firebase';
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
        <QuestionList classKey={this.props.match.params.classroomid} />
        <QuestionForm classKey={this.props.match.params.classroomid} />
      </div>;
  }
}

export default Halpq;
