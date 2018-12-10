import React, { Component } from 'react';
import firebase from '../firebase';
import closeIcon from '../assets/closeIcon.svg';

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

  handleSubmit = e => {
    e.preventDefault();
    // post this new book to firebase
    dbRef.ref(`/Chat/${this.state.classKey}/${this.state.questionKey}/`).push({
      name: this.state.user.displayName,
      content: this.state.userInput,
      uid: this.state.user.uid,
      photoURL: this.state.user.photoURL,
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

  componentDidMount() {
    dbRef
      .ref(`/Questions/${this.state.classKey}/${this.state.questionKey}`)
      .once('value', snapshot => {
        if (snapshot.val().uid === this.state.user.uid || this.state.isAdmin) {
          this.setState({
            questionOwner: true,
          });
        }
      });
  }

  componentWillUnmount() {
    dbRef
      .ref(`/Questions/${this.state.classKey}/${this.state.questionKey}`)
      .off();
  }

  render() {
    return (
      <div className="chat">
        <div className="chat__convo">
          <button type="button" id="close" onClick={this.props.closeModal}>
            <div className="chat__closeIcon">
              <img src={closeIcon} alt="" />
            </div>
          </button>
          {this.props.chatArray.map(chat => (
            <div className="chat__message" key={chat[0]}>
              <div className="chat__userInfo">
                <p>{chat[1].name}</p>
                {/* <img src={chat[1].photoURL} alt="" /> */}
              </div>
              <div className="chat__chatContent">
                <p>{chat[1].content}</p>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="chat__inputArea"> */}
        {this.state.questionOwner ? (
          <form action="" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name=""
              onChange={this.handleChange}
              value={this.state.userInput}
              id="submitInput"
              className="chat__messageInput"
            />
            <input
              type="submit"
              id="submitChatMessage"
              className="chat__buttonSubmit"
            />
          </form>
        ) : null}
      </div>
      // </div>
    );
  }
}

// const modal = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   width: '100%',
//   display: 'block',
//   height: '100%',
//   background: 'rgba(35, 31, 31, 0.8)',
// };

// const modalMain = {
//   position: 'fixed',
//   display: 'block',
//   background: 'white',
//   width: '80%',
//   height: 'auto',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
// };

export default ConversationModel;
