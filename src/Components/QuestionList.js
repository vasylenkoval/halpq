import React, { Component } from 'react';
import firebase from 'firebase';

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
        this.setState({ studentList: [] });
      } else if (snapshot.val()) {
        // console.log(snapshot.val());
        const questionArray = Object.entries(snapshot.val());
        // console.log(questionArray);
        this.setState({ questions: questionArray });
      }
    });
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
          </div>
        ))}
      </div>
    );
  }
}

export default QuestionList;
