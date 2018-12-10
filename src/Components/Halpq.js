import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
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
      classKey: this.props.match.params.classroomid,
      classroomName: '',
    };
  }

  handleClick = e => {
    if (e.target.name === 'Active') {
      this.setState({
        archiveToggle: false,
      });
    } else if (e.target.name === 'Completed') {
      this.setState({
        archiveToggle: true,
      });
    }
  };

  componentDidMount() {
    const dbRef = firebase.database();
    dbRef.ref(`/Classrooms/${this.state.classKey}`).once('value', snapshot => {
      this.setState({
        classroomName: snapshot.val().classroomName,
      });
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.classroomName}</h2>
        <div className="returnLink">
          <Link to="/">Return to Classrooms</Link>
        </div>

        <button onClick={this.handleClick} name="Active">
          Active Questions
        </button>
        <button onClick={this.handleClick} name="Completed">
          Completed Questions
        </button>
        {!this.state.archiveToggle ? (
          <div>
            <QuestionList
              classKey={this.state.classKey}
              user={this.state.user}
              isAdmin={this.state.isAdmin}
            />
            <QuestionForm
              user={this.state.user}
              isAdmin={this.state.isAdmin}
              classKey={this.state.classKey}
            />
          </div>
        ) : (
          <ArchiveList
            classKey={this.state.classKey}
            user={this.state.user}
            isAdmin={this.state.isAdmin}
          />
        )}
      </div>
    );
  }
}

export default Halpq;
