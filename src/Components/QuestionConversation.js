import React, { Component } from 'react';
import firebase from '../firebase';
import ConversationModal from './ConversationModal';
import startConversation from '../assets/start-conversation.svg';

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
      <div className="questionConversation clearfix">
        {this.state.isAdmin ? (
          this.state.chatStarted ? (
            <button type="button" onClick={this.handleChange} className="">
              {/* If you're admin and the chat has started view the conversation  */}
              <div className="buttonImage">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="16 12 70 74"
                  space="preserve"
                >
                  <g>
                    <path
                      fill="#231f1f"
                      d="M18.9,83.7c0.4,0.5,1,0.8,1.6,0.8c0.1,0,0.2,0,0.3,0l18-3.1c3.6,1.3,7.4,1.9,11.2,1.9c18.7,0,33.9-15.2,33.9-33.9   S68.7,15.5,50,15.5S16.1,30.7,16.1,49.4c0,4.3,0.8,8.4,2.3,12.3c1.2,3.1,2.9,6,5,8.6l-4.8,11.4C18.3,82.4,18.4,83.2,18.9,83.7z    M67.2,43.6c3.5,0,6.4,2.9,6.4,6.4s-2.9,6.4-6.4,6.4s-6.4-2.9-6.4-6.4S63.7,43.6,67.2,43.6z M50,43.6c3.5,0,6.4,2.9,6.4,6.4   s-2.9,6.4-6.4,6.4s-6.4-2.9-6.4-6.4S46.5,43.6,50,43.6z M32.8,43.6c3.5,0,6.4,2.9,6.4,6.4s-2.9,6.4-6.4,6.4s-6.4-2.9-6.4-6.4   S29.2,43.6,32.8,43.6z"
                    />
                  </g>
                </svg>
              </div>
              <p>View chat</p>
            </button>
          ) : (
            <button type="button" onClick={this.handleChange}>
              <div className="buttonImage">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="16 12 70 74"
                  fill="#231f1f"
                  space="preserve"
                >
                  <g>
                    <path
                      fill="#231f1f"
                      d="M20,83.4c0.2,0.2,0.5,0.4,0.8,0.4c0.1,0,0.1,0,0.2,0l18.2-3.4c3.6,1.3,7.4,1.9,11.2,1.9c8.8-0.1,17-3.6,23.2-9.9   c6.2-6.3,9.5-14.6,9.4-23.3s-3.6-17-9.9-23.2c-6.3-6.1-14.6-9.5-23.3-9.4c-8.8,0.1-17,3.6-23.2,9.9S17,40.9,17.1,49.7   c0,4.1,0.8,8.2,2.4,12c1.3,3.2,3,6.1,5.3,8.8l-5,12C19.7,82.7,19.7,83.1,20,83.4z M46.9,35.5l6-0.1L53,47l11.5-0.1l0.1,6L53,53   l0.1,11.5l-6,0.1L47,53l-11.5,0.1l-0.1-6L47,47L46.9,35.5z"
                    />
                  </g>
                </svg>
              </div>
              <p>Start chat</p>
            </button>
          )
        ) : this.state.chatStarted ? (
          <button type="button" onClick={this.handleChange} className="">
              {/* If the chat has started view the conversation  */}
              <div className="buttonImage">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="16 12 70 74"
                  space="preserve"
                >
                  <g>
                    <path
                      fill="#231f1f"
                      d="M18.9,83.7c0.4,0.5,1,0.8,1.6,0.8c0.1,0,0.2,0,0.3,0l18-3.1c3.6,1.3,7.4,1.9,11.2,1.9c18.7,0,33.9-15.2,33.9-33.9   S68.7,15.5,50,15.5S16.1,30.7,16.1,49.4c0,4.3,0.8,8.4,2.3,12.3c1.2,3.1,2.9,6,5,8.6l-4.8,11.4C18.3,82.4,18.4,83.2,18.9,83.7z    M67.2,43.6c3.5,0,6.4,2.9,6.4,6.4s-2.9,6.4-6.4,6.4s-6.4-2.9-6.4-6.4S63.7,43.6,67.2,43.6z M50,43.6c3.5,0,6.4,2.9,6.4,6.4   s-2.9,6.4-6.4,6.4s-6.4-2.9-6.4-6.4S46.5,43.6,50,43.6z M32.8,43.6c3.5,0,6.4,2.9,6.4,6.4s-2.9,6.4-6.4,6.4s-6.4-2.9-6.4-6.4   S29.2,43.6,32.8,43.6z"
                    />
                  </g>
                </svg>
              </div>
              <p>View chat</p>
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
