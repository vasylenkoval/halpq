import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import ArchiveList from './ArchiveList';

class Halpq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      isAdmin: this.props.isAdmin,
      user: this.props.user,
      archiveToggle: false,
    };
  }

  render() {
    return (
      <div>
        <div className="returnLink">
          <Link to="/">Return to Classrooms</Link>
        </div>
        {!this.state.archiveToggle ? (
          <div>
            <QuestionList
              classKey={this.props.match.params.classroomid}
              user={this.state.user}
              isAdmin={this.state.isAdmin}
            />
            <QuestionForm
              user={this.state.user}
              isAdmin={this.state.isAdmin}
              classKey={this.props.match.params.classroomid}
            />
          </div>
        ) : (
          <ArchiveList
            classKey={this.props.match.params.classroomid}
            user={this.state.user}
            isAdmin={this.state.isAdmin}
          />
        )}
      </div>
    );
  }
}

export default Halpq;
