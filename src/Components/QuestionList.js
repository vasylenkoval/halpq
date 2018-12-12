import React, { Component } from 'react';
import firebase from 'firebase';
import CompleteQuestion from './CompleteQuestion';
import BeingHelped from './BeingHelped';
import QuestionConversation from './QuestionConversation';
import backChevron from '../assets/back-chevron.svg';
import beingHelped from '../assets/being-helped.svg';

const dbRef = firebase.database();

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
    dbRef.ref(`/Questions/${this.state.classKey}`).off();
  }

  timeConverter = timestamp =>
    new Date(timestamp).toLocaleTimeString([], {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });

  render() {
    return (
      <div className="question__listing">
        {this.state.questions.map(question => (
          <div
            className={
              question[1].isBeingHelped
                ? 'clearfix question question__beingHelped'
                : 'clearfix question'
            }
            key={question[0]}
          >
            <div className="question__userInfo">
              <div className="question__userInfo__image">
                <img src={question[1].photoURL} alt="" />
                <div className="question__time">
                  {this.timeConverter(question[1].dateCreated)}
                </div>
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
              {this.state.isAdmin ? (
                question[1].isBeingHelped ? (
                  <CompleteQuestion
                    user={this.state.user}
                    isAdmin={this.state.isAdmin}
                    classKey={this.state.classKey}
                    questionKey={question[0]}
                    questionOwner
                  />
                ) : (
                  <BeingHelped
                    user={this.state.user}
                    isAdmin={this.state.isAdmin}
                    classKey={this.state.classKey}
                    questionKey={question[0]}
                    questionOwner
                  />
                )
              ) : null}
              <QuestionConversation
                user={this.state.user}
                isAdmin={this.state.isAdmin}
                classKey={this.state.classKey}
                questionKey={question[0]}
                questionOwner
              />
              {question[1].isBeingHelped && !this.state.isAdmin ? (
                <div className="beinghelped__indicator">Being helped</div>
              ) : null}

              {question[1].isBeingHelped ? (
                <div className="buttonImage beingHelped__active">
                  <img src={beingHelped} alt="" />
                </div>
              ) : null}
              {/* Make being helped p tag into an icon or nicer thing to show they are currently being helped */}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default QuestionList;
