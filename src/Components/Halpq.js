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

  // componentDidMount() {
  //   console.log('yo');
  //   const dbRef = firebase.database();
  //   dbRef
  //     .ref(
  //       `/Classrooms/${this.props.match.params.classroomid}/classroomQuestions`
  //     )
  //     .on('value', snapshot => {
  //       console.log(snapshot.val());
  //       const questionArray = Object.entries(snapshot.val());
  //       console.log(questionArray);
  //       this.setState({questions: questionArray});
  //     });
  // }

  render() {
    return (
      <div>
        <QuestionList />
        <QuestionForm classKey={this.props.match.params.classroomid}/>
      </div>
    );
  }

}

export default Halpq;
