import React, { Component } from 'react';
import firebase from 'firebase';
import DeleteQuestion from './DeleteQuestion';
import QuestionConversation from './QuestionConversation';

class AchiveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      classroomName: '',
    };
  }

  componentDidMount() {
    const dbRef = firebase.database();
    // dbRef.ref(`/Questions/${this.props.classKey}`).once('value', snapshot => {
    //   if (snapshot.exists()) {
    //     this.setState({
    //       classroomName: snapshot.val().classroomName,
    //     });
    //   }
    // });
    dbRef.ref(`/Archive/${this.props.classKey}`).on('value', snapshot => {
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
    dbRef.ref(`/Archive/${this.props.classKey}`).off();
  }

  render() {
    return (
      <div className="question__listing__archive">
        {this.state.questions.length > 0 ? (
          this.state.questions.map(question => (
            <div
              className="clearfix question question--archive"
              key={question[0]}
              // questionKey={question[0]}
            >
              <div className="question__userInfo">
                <div className="question__userInfo__image">
                  <img src={question[1].photoURL} alt="" />
                </div>
              </div>
              <div className="question__questionContent clearfix">
                <div className="question__questionContent--infoContainer">
                  <p className="question__questionContent--name">
                    {question[1].name}
                  </p>
                  <p className="question__questionContent--location">
                    {question[1].location}
                  </p>
                </div>
                <div className="question__questionContent--contentContainer">
                  <p className="question__questionContent--content">
                    {question[1].content}
                  </p>
                </div>
              </div>
              <div className="question__actions__admins">
                {this.props.isAdmin ? (
                  <DeleteQuestion
                    user={this.props.user}
                    isAdmin={this.props.isAdmin}
                    classKey={this.props.classKey}
                    questionKey={question[0]}
                    questionOwner
                  />
                ) : (
                  <div className="question__completed">Completed</div>
                )}
                <QuestionConversation
                  user={this.props.user}
                  isAdmin={this.props.isAdmin}
                  classKey={this.props.classKey}
                  questionKey={question[0]}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="question__listing__archive--none">
            No completed questions
          </div>
        )}
      </div>
    );
  }
}

export default AchiveList;
