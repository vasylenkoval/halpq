import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import ArchiveList from './ArchiveList';
import backChevron from '../assets/back-chevron.svg';
import toggleLeft from '../assets/toggle-left.svg';
import toggleRight from '../assets/toggle-right.svg';

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
      <div className="halpq">
        <div className="wrapper">
          <h2 class="halpq__title">{classroomName}</h2>
          <Link className="backLink" to="/">
            <div className="returnLink clearfix">
              <div className="returnLink__img">
                <img src={backChevron} alt="" />
              </div>
              <p>Back to Classlist</p>
            </div>
          </Link>

          <button type="button" onClick={this.handleClick} className={!this.state.archiveToggle ? 'halpq__filter halpq__filter__active' : 'halpq__filter'} name="Active">
            Active Questions
          </button>
          <button type="button" onClick={this.handleClick} className={this.state.archiveToggle ? 'halpq__filter halpq__filter__active' : 'halpq__filter'} name="Completed">
            Completed Questions
          </button>
          {isAdmin ? (
            <button type="button" onClick={this.disableClassroom}>
              <div className="buttonImage halpq__toggleclassroom">{isClassroomDisabled ? 
              <img src={toggleLeft} className="halpq__toggleDisable" alt="disable classroom" />  : 
              <img src={toggleRight} className="halpq__toggleEnable" alt="enable classroom" />}</div>
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
                <QuestionForm
                  user={user}
                  isAdmin={isAdmin}
                  classKey={classKey}
                />
              )}
            </div>
          ) : (
            <ArchiveList classKey={classKey} user={user} isAdmin={isAdmin} />
          )}
        </div>
      </div>
    );
  }
}

export default Halpq;
