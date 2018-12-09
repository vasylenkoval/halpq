import React, { Component } from 'react';
import firebase from 'firebase';
import CompleteQuestion from './CompleteQuestion';
import BeingHelped from './BeingHelped';
import QuestionConversation from './QuestionConversation';

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      isAdmin: this.props.isAdmin,
      user: this.props.user,
      classKey: this.props.classKey,
      classroomName: '',
    };
  }

  componentDidMount() {
    const dbRef = firebase.database();
    dbRef.ref(`/Classrooms/${this.state.classKey}`).once('value', snapshot => {
      this.setState({
        classroomName: snapshot.val().classroomName,
      });
    });
    dbRef.ref(`/Questions/${this.state.classKey}`).on('value', snapshot => {
      if (!snapshot.exists()) {
        this.setState({ questions: [] });
      } else if (snapshot.val()) {
        const questionArray = Object.entries(snapshot.val());
        this.setState({ questions: questionArray });
      }
    });
  }

  componentWillUnmount() {
    const dbRef = firebase.database();
    dbRef.ref(`/Questions/${this.state.classKey}`).off();
  }

  render() {
    return <div>
        <h2>{this.state.classroomName}</h2>
        {this.state.questions.map(question => (
          <div
            style={{ border: `1px solid green` }}
            className="question"
            key={question[0]}
            // questionKey={question[0]}
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
              <CompleteQuestion
                user={this.state.user}
                isAdmin={this.state.isAdmin}
                classKey={this.state.classKey}
                questionKey={question[0]}
                questionOwner
              />
              <BeingHelped
                user={this.state.user}
                isAdmin={this.state.isAdmin}
                classKey={this.state.classKey}
                questionKey={question[0]}
                questionOwner
              />
              <QuestionConversation
                user={this.state.user}
                isAdmin={this.state.isAdmin}
                classKey={this.state.classKey}
                questionKey={question[0]}
                questionOwner
              />
            </div>
          </div>
        ))}
      </div>;
  }
}

export default QuestionList;
