import React, { Component } from 'react';
import firebase from '../firebase';

const dbRef = firebase.database();

class ConversationModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classKey: this.props.classKey,
      userInput: '',
      isAdmin: this.props.isAdmin,
      user: this.props.user,
      questionKey: this.props.questionKey,
      questionOwner: false,
      index: 0,
    };
  }

  componentDidMount() {
    dbRef
      .ref(`/Questions/${this.state.classKey}/${this.state.questionKey}`)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          if (
            snapshot.val().uid === this.state.user.uid ||
            this.state.isAdmin
          ) {
            this.setState({
              questionOwner: true,
            });
          }
        }
      });
    this.scrollToBottom();
  }

  // All admins are able to see all conversations
  // All users can see all conversations but not respond
  // Only the question owner can respond to a conversation on his question

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    dbRef
      .ref(`/Questions/${this.state.classKey}/${this.state.questionKey}`)
      .off();
  }

  handleSubmit = e => {
    const { user, classKey, questionKey, userInput } = this.state;
    e.preventDefault();
    // post this new book to firebase
    dbRef.ref(`/Chat/${classKey}/${questionKey}/`).push({
      name: user.displayName,
      content: userInput,
      uid: user.uid,
      photoURL: user.photoURL,
      dateCreated: +new Date(),
    });
    this.setState({ userInput: '' });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      userInput: e.target.value,
    });
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    return (
      <div className="chat">
        <button
          className="chat__controls"
          type="button"
          id="close"
          onClick={this.props.closeModal}
        >
          ✕
        </button>
        <div className="chat__wrapper">
          <div
            className={
              this.state.questionOwner
                ? 'chat__convo'
                : 'chat__convo chat__convo--nopadding'
            }
          >
            {this.props.chatArray.map(chat => (
              <div className="chat__message" key={chat[0]}>
                <div className="chat__userInfo">
                  <p>{chat[1].name}</p>
                </div>
                <div className="chat__chatContent">
                  <p>{chat[1].content}</p>
                </div>
              </div>
            ))}
            <div
              style={{ float: 'left', clear: 'both' }}
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </div>
          {this.state.questionOwner ? (
            <form
              autoComplete="off"
              className="chat__input__form"
              action=""
              onSubmit={this.handleSubmit}
            >
              <input
                type="text"
                name=""
                onChange={this.handleChange}
                value={this.state.userInput}
                id="submitInput"
                className="chat__messageInput"
                placeholder="Enter your message"
              />
              <input
                type="submit"
                id="submitChatMessage"
                className="chat__buttonSubmit"
              />
            </form>
          ) : null}
        </div>
      </div>
    );
  }
}
export default ConversationModel;
