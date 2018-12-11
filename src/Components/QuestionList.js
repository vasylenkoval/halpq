import React, { Component } from "react";
import firebase from "firebase";
import CompleteQuestion from "./CompleteQuestion";
import BeingHelped from "./BeingHelped";
import QuestionConversation from "./QuestionConversation";
import backChevron from "../assets/back-chevron.svg";
import beingHelped from "../assets/being-helped.svg";

const dbRef = firebase.database();

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      isAdmin: this.props.isAdmin,
      user: this.props.user,
      classKey: this.props.classKey,
      classroomName: ""
    };
  }

  componentDidMount() {
    dbRef.ref(`/Questions/${this.state.classKey}`).on("value", (snapshot) => {
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

  render() {
    return (
      <div className="question__list">
        <h3 className="question__list__title">Active Questions</h3>
        {this.state.questions.map((question) => (
          <div
            className={
              question[1].isBeingHelped
                ? "question question__beingHelped"
                : "question"
            }
            key={question[0]}
          >
            <div className="question__userInfo">
              <div className="question__userInfo__image">
                <img src={question[1].photoURL} alt="" />
                <p>{question[1].name}</p>
              </div>
            </div>
            <div className="question__questionContent clearfix">
              <p>{question[1].location}</p>
              <p>{question[1].content}</p>
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
