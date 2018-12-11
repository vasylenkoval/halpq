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
        <div className="wrapper clearfix">
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
          <button type="button" onClick={this.handleClick} className={this.state.archiveToggle ? 'halpq__filter halpq__filter' : 'halpq__filter'} name="Completed">
            Completed Questions
          </button>
          {isAdmin ? (
            <button type="button" className="halpq__toggleclassroom" onClick={this.disableClassroom}>
              <div className="buttonImage">{isClassroomDisabled ? 
              <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" space="preserve"><g display="none"><g display="inline"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#000000" d="M30,27C17.35,27,7,37.35,7,50l0,0c0,12.65,10.35,23,23,23h40     c12.65,0,23-10.35,23-23l0,0c0-12.65-10.35-23-23-23H30z M30,67c-9.389,0-17-7.61-17-17s7.611-17,17-17s17,7.61,17,17     S39.389,67,30,67z"/></g></g></g><g><path fill-rule="evenodd" clip-rule="evenodd" d="M30,27C17.35,27,7,37.35,7,50l0,0c0,12.65,10.35,23,23,23h40   c12.65,0,23-10.35,23-23l0,0c0-12.65-10.35-23-23-23H30z M30,67c-9.389,0-17-7.61-17-17s7.611-17,17-17s17,7.61,17,17   S39.389,67,30,67z"/></g><g display="none"><g display="inline"><path fill="#000000" stroke="#E00C02" stroke-width="4" stroke-miterlimit="10" d="M93,50c0,12.65-10.35,23-23,23H30    C17.35,73,7,62.65,7,50l0,0c0-12.65,10.35-23,23-23h40C82.65,27,93,37.35,93,50L93,50z"/></g><circle display="inline" fill-rule="evenodd" clip-rule="evenodd" fill="#000000" stroke="#E00C02" stroke-width="4" stroke-miterlimit="10" cx="30" cy="50" r="17"/></g><g display="none"><path fill="black" display="inline" d="M70,75H30C16.215,75,5,63.785,5,50s11.215-25,25-25h40c13.785,0,25,11.215,25,25S83.785,75,70,75z M30,29   C18.421,29,9,38.421,9,50s9.421,21,21,21h40c11.579,0,21-9.421,21-21s-9.421-21-21-21H30z M30,69c-10.477,0-19-8.523-19-19   s8.523-19,19-19s19,8.523,19,19S40.477,69,30,69z M30,35c-8.271,0-15,6.729-15,15s6.729,15,15,15s15-6.729,15-15S38.271,35,30,35z"/></g></svg>  : 
              <svg className="halpq__toggleclassroom__active" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" space="preserve"><g display="none"><g display="inline"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#000000" d="M30,27C17.35,27,7,37.35,7,50l0,0c0,12.65,10.35,23,23,23h40     c12.65,0,23-10.35,23-23l0,0c0-12.65-10.35-23-23-23H30z M70,67c-9.389,0-17-7.61-17-17s7.611-17,17-17s17,7.61,17,17     S79.389,67,70,67z"/></g></g></g><g><path fill-rule="evenodd" clip-rule="evenodd" d="M30,27C17.35,27,7,37.35,7,50l0,0c0,12.65,10.35,23,23,23h40   c12.65,0,23-10.35,23-23l0,0c0-12.65-10.35-23-23-23H30z M70,67c-9.389,0-17-7.61-17-17s7.611-17,17-17s17,7.61,17,17   S79.389,67,70,67z"/></g><g display="none"><g display="inline"><path fill="#00000" stroke="#E00C02" stroke-width="4" stroke-miterlimit="10" d="M7,50c0,12.65,10.35,23,23,23h40    c12.65,0,23-10.35,23-23l0,0c0-12.65-10.35-23-23-23H30C17.35,27,7,37.35,7,50L7,50z"/></g><circle display="inline" fill-rule="evenodd" clip-rule="evenodd" fill="#000000" stroke="#E00C02" stroke-width="4" stroke-miterlimit="10" cx="70" cy="50" r="17"/></g><g display="none"><path fill="black" display="inline" d="M70,25H30C16.215,25,5,36.215,5,50s11.215,25,25,25h40c13.785,0,25-11.215,25-25S83.785,25,70,25z M70,71   H30C18.421,71,9,61.579,9,50s9.421-21,21-21h40c11.579,0,21,9.421,21,21S81.579,71,70,71z M70,31c-10.477,0-19,8.523-19,19   s8.523,19,19,19s19-8.523,19-19S80.477,31,70,31z M70,65c-8.271,0-15-6.729-15-15s6.729-15,15-15s15,6.729,15,15S78.271,65,70,65z"/></g></svg>}</div>
            </button>
          ) : null}
          {!archiveToggle ? (
            <div className="question__list clearfix">
              
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
