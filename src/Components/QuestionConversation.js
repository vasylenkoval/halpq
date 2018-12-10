import React, { Component } from 'react';
import firebase from '../firebase';
import ConversationModal from './ConversationModal';

class QuestionConversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: this.props.isAdmin,
      user: this.props.user,
      isOpen: false,
      classKey: this.props.classKey,
      questionKey: this.props.questionKey,
      chatStarted: false,
      chatArray: [],
    };
  }

  // isAdmin = () => {
  //   if (this.setState.isAdmin && this.state.chatStarted != true) {
  //     return true;
  //   }
  // };

  componentDidMount() {
    const dbRef = firebase.database();
    // console.log(dbRef.ref.parent);
    dbRef
      .ref(`/Chat/${this.state.classKey}/${this.state.questionKey}/`)
      .on('value', snapshot => {
        if (!snapshot.exists()) {
          this.setState({ chatArray: [] });
        } else if (snapshot.val()) {
          const chatArray = Object.entries(snapshot.val());
          this.setState({ chatArray }, () => {
            if (this.state.chatArray[0]) {
              this.setState({
                chatStarted: true,
              });
            }
          });
        }
      });
  }

  handleChange = e => {
    e.preventDefault();
    !this.state.isOpen
      ? this.setState({
          isOpen: true,
        })
      : this.setState({
          isOpen: false,
        });
  };

  render() {
    return (
      <div>
        {this.state.isAdmin ? (
          this.state.chatStarted ? (
            <button
              type="button"
              onClick={this.handleChange}
              className={QuestionConversation}
            >
              VIEW CONVERATION
            </button>
          ) : (
            <button
              type="button"
              onClick={this.handleChange}
              className={QuestionConversation}
            >
              START CONVERATION
            </button>
          )
        ) : this.state.chatStarted ? (
          <button
            type="button"
            onClick={this.handleChange}
            className={QuestionConversation}
          >
            VIEW CONVERATION
          </button>
        ) : null}

        {this.state.isOpen ? (
          <ConversationModal
            isAdmin={this.state.isAdmin}
            user={this.props.user}
            closeModal={this.handleChange}
            classKey={this.state.classKey}
            questionKey={this.state.questionKey}
            chatArray={this.state.chatArray}
          />
        ) : null}
      </div>
    );
  }
}

export default QuestionConversation;
