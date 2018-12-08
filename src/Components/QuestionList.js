import React, { Component } from 'react';
import firebase from 'firebase';
import CompleteQuestion from './CompleteQuestion';
import BeingHelped from './BeingHelped';

class QuestionList extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    // console.log('yo');
    const dbRef = firebase.database();
    dbRef.ref(`/Questions/${this.props.classKey}`).on('value', snapshot => {
      if (!snapshot.exists()) {
        this.setState({ questions: [] });
      } else if (snapshot.val()) {
        // console.log(snapshot.val());
        const questionArray = Object.entries(snapshot.val());
        // console.log(questionArray);
        this.setState({ questions: questionArray });
      }
    });
  }

  componentWillUnmount() {
    const dbRef = firebase.database();
    dbRef.ref(`/Questions/${this.props.classKey}`).off();
  }

  render() {
    return (
      <div>
        <h2>---Questions here---</h2>
        {this.state.questions.map(question => (
          <div
            style={{ border: `1px solid green` }}
            className="question"
            key={question[0]}
          >
            <div className="question__questionContent">
              <p>{question[1].location}</p>
              <p>{question[1].content}</p>
            </div>
            <div className="question__userInfo">
              <p>{question[1].name}</p>
              {/* <img src={question[1].photoURL} alt="" /> */}
            </div>
            <div className="question__actions__admins">
              <CompleteQuestion/>
              <BeingHelped />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default QuestionList;
