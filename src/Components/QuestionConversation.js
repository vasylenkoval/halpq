import React, { Component } from 'react';
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
    };
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
        <button
          type="button"
          onClick={this.handleChange}
          className={QuestionConversation}
        >
          START CONVERATION
        </button>
        {this.state.isOpen ? (
          <ConversationModal
            isAdmin={this.state.isAdmin}
            user={this.props.user}
            closeModal={this.handleChange}
            classKey={this.state.classKey}
            questionKey={this.state.questionKey}
          />
        ) : null}
      </div>
    );
  }
}

export default QuestionConversation;
