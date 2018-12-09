import React, { Component } from 'react';
import ConversationModal from './ConversationModal';

class QuestionConversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: this.props.isAdmin,
      user: this.props.user,
      isOpen: false,
    };
  }

  handleChange = e => {
    console.log('button was clicked');
    e.preventDefault();
    !this.state.isOpen
      ? this.setState({
          isOpen: true,
        })
      : this.setState({
          isOpen: true,
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
            classKey="-LT-S0NclmfEtqcHul_W-LT-S0NclmfEtqcHul_W"
          />
        ) : null}
      </div>
    );
  }
}

export default QuestionConversation;
