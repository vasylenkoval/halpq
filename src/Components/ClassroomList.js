import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import ClassroomListItem from './ClassroomListItem';

const dbRef = firebase.database();

class ClassroomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [],
      isAdmin: this.props.isAdmin,
      user: this.props.user,
      activateForm: false,
      userInput: '',
    };
  }

  componentDidMount() {
    this.createClassList();
  }

  componentWillUnmount() {
    const { user } = this.state;
    dbRef.ref(`/Classrooms/`).off();
    dbRef.ref(`/Users/Students/${user.uid}/enrolledClasses/`).off();
  }

  classroomEnroll = enrollPassword => {
    const { user, isAdmin } = this.state;
    dbRef.ref(`/Classrooms`).once('value', snapshot => {
      const classroomMatch = Object.entries(snapshot.val()).filter(element =>
        element[0].includes(enrollPassword)
      );
      if (classroomMatch.length > 0) {
        // If there is a match - record a student in classroom ref
        dbRef
          .ref(
            `/Classrooms/${classroomMatch[0][0]}/enrolledStudents/${user.uid}`
          )
          .set(user.displayName);

        // Also record a class key in student's own profile
        dbRef
          .ref(
            `/Users/${isAdmin ? `Admins` : `Students`}/${
              user.uid
            }/enrolledClasses/${classroomMatch[0][0]}`
          )
          .set(`${classroomMatch[0][1].classroomName}`);
        this.createClassList();
      } else {
        console.log('Wrong key!');
      }
    });
  };

  createClassList = () => {
    const { isAdmin, user } = this.state;
    const studentClassList = [];
    let studentKeys = [];
    let adminKeys = [];
    let adminClassList = [];

    if (isAdmin) {
      dbRef.ref('/Classrooms/').once('value', snapshot => {
        adminKeys = Object.keys(snapshot.val());
        adminClassList = Object.entries(snapshot.val()).map(
          element => element[1]
        );
        this.setState({
          classList: adminClassList,
          classKeys: adminKeys,
        });
      });
    } else {
      dbRef
        .ref(`Users/Students/${user.uid}/enrolledClasses`)
        .once('value', snapshot => {
          if (snapshot.val()) {
            studentKeys = Object.entries(snapshot.val()).map(
              element => element[0]
            );
            studentKeys.forEach(element => {
              dbRef.ref(`Classrooms/${element}`).once('value', snapshot => {
                studentClassList.push(snapshot.val());
                this.setState({
                  classList: studentClassList,
                  classKeys: studentKeys,
                });
              });
            });
          } else {
            console.log('You are not enrolled in any class');
            this.setState({
              classList: [],
              classKeys: [],
            });
          }
        });
    }
  };

  createClassroom = name => {
    dbRef.ref(`/Classrooms/`).push({
      classroomName: name,
      enrolledStudents: 0,
    });
    this.createClassList();
  };

  handleClick = e => {
    const { activateForm } = this.state;
    if (activateForm) {
      this.setState({
        activateForm: false,
      });
    } else {
      this.setState({
        activateForm: true,
      });
    }
  };

  handleChange = e => {
    this.setState({
      userInput: e.target.value,
    });
  };

  conditionalAction = e => {
    const { userInput, isAdmin } = this.state;
    e.preventDefault();
    if (/\S/.test(userInput)) {
      isAdmin
        ? this.createClassroom(userInput)
        : this.classroomEnroll(userInput);
      this.setState({
        activateForm: false,
        userInput: '',
      });
    } else {
      console.log('User passed empty string');
    }
  };

  render() {
    const {
      classKeys,
      classList,
      user,
      isAdmin,
      activateForm,
      userInput,
    } = this.state;
    return (
      <div className="classroomlist">
        <div className="classroomlist__wrapper">
          <div className="classroomlist__title">
            <h2>Classrooms</h2>
          </div>
          {classList.map((element, i) => (
            <Link
              to={`/classroom/${classKeys[i]}`}
              key={classKeys[i]}
              params={{ user }}
            >
              <ClassroomListItem
                classroomName={element.classroomName}
                studentCount={
                  element.enrolledStudents
                    ? Object.keys(element.enrolledStudents).length
                    : 0
                }
                key={classKeys[i]}
                password={classKeys[i].slice(1, 9)}
                isDisabled={
                  !(
                    element.disabled === undefined || element.disabled === false
                  )
                }
              />
            </Link>
          ))}

          {activateForm ? (
            <div className="classroomlist__form__backdrop" />
          ) : null}
          <button
            type="button"
            className="classroomlist__addbutton"
            onClick={this.handleClick}
            name={isAdmin ? 'classroomBeingCreated' : 'classroomBeingJoined'}
          >
            ＋
          </button>
          {activateForm ? (
            <form
              className="classroomlist__form"
              onSubmit={this.conditionalAction}
              autoComplete="off"
            >
              <label
                className="classroomlist__form__label visuallyhidden"
                htmlFor="conditional-input"
              >
                {isAdmin ? 'Create new classroom' : 'Join Classroom'}
              </label>
              <input
                className="classroomlist__form__input"
                type="text"
                placeholder={
                  isAdmin ? 'Enter classroom name' : 'Enter your classroom key'
                }
                id="conditional-input"
                onChange={this.handleChange}
                value={userInput}
                minLength={isAdmin ? 3 : 8}
              />
              <button className="classroomlist__form__submit" type="submit">
                {isAdmin ? 'New classroom' : 'Join classroom'}
              </button>
            </form>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ClassroomList;
