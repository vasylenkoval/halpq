import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import ArchiveList from './ArchiveList';

const dbRef = firebase.database();

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
      isClassroomDisabled: false,
    };
  }

  componentDidMount() {
    dbRef.ref(`/Classrooms/${this.state.classKey}`).once('value', snapshot => {
      this.setState({
        classroomName: snapshot.val().classroomName,
        isClassroomDisabled: !(
          snapshot.val().disabled === undefined ||
          snapshot.val().disabled === false
        ),
      });
    });
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

  disableClassroom = () => {
    if (this.state.isClassroomDisabled) {
      dbRef.ref(`/Classrooms/${this.state.classKey}/disabled`).set(false);
      this.setState({
        isClassroomDisabled: false,
      });
    } else {
      dbRef.ref(`/Classrooms/${this.state.classKey}/disabled`).set(true);
      this.setState({
        isClassroomDisabled: true,
      });
    }
  };

  render() {
    const {
      isClassroomDisabled,
      archiveToggle,
      classKey,
      user,
      isAdmin,
      classroomName,
    } = this.state;
    return (
      <div>
        <h2>{classroomName}</h2>
        <div className="returnLink">
          <Link to="/">Return to Classrooms</Link>
        </div>

        <button type="button" onClick={this.handleClick} name="Active">
          Active Questions
        </button>
        <button type="button" onClick={this.handleClick} name="Completed">
          Completed Questions
        </button>
        {isAdmin ? (
          <button type="button" onClick={this.disableClassroom}>
            {isClassroomDisabled ? 'Enable classroom' : 'Disable classroom'}
          </button>
        ) : null}
        {!archiveToggle ? (
          <div>
            <QuestionList classKey={classKey} user={user} isAdmin={isAdmin} />
            {isClassroomDisabled ? (
              <p>
                <strong>This classroom is temporarily disabled 🙊</strong>
              </p>
            ) : (
              <QuestionForm user={user} isAdmin={isAdmin} classKey={classKey} />
            )}
          </div>
        ) : (
          <ArchiveList classKey={classKey} user={user} isAdmin={isAdmin} />
        )}
      </div>
    );
  }
}

export default Halpq;
