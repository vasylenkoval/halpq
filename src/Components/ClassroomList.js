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

  componentWillMount() {
    this.createClassList();
  }

  componentDidMount() {
    this.refreshOnChange();
  }

  componentWillUnmount() {
    dbRef.ref(`/Classrooms/`).off();
    dbRef.ref(`/Users/Students/${this.state.user.uid}/enrolledClasses/`).off();
  }

  classroomEnroll = enrollPassword => {
    const dbRef = firebase.database();
    dbRef.ref(`/Classrooms`).once('value', snapshot => {
      const classroomMatch = Object.entries(snapshot.val()).filter(element =>
        element[0].includes(enrollPassword)
      );
      console.log(classroomMatch);
      console.log("yo")
      if (classroomMatch.length > 0) {
        // If there is a match - record a student in classroom ref
        dbRef
          .ref(
            `/Classrooms/${classroomMatch[0][0]}/enrolledStudents/${
              this.state.user.uid
            }`
          )
          .set(this.state.user.displayName);

        // Also record a class key in student's own profile
        dbRef
          .ref(
            `/Users/${this.state.isAdmin ? `Admins` : `Students`}/${
              this.state.user.uid
            }/enrolledClasses/${classroomMatch[0][0]}`
          )
          .set(this.state.user.displayName);
      } else {
        console.log('Wrong key!');
      }
    });
  };

  createClassList = () => {
    const studentClassList = [];
    let studentKeys = [];
    let adminKeys = [];
    let adminClassList = [];

    if (this.state.isAdmin) {
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
        .ref(`Users/Students/${this.state.user.uid}/enrolledClasses`)
        .once('value', snapshot => {
          if (snapshot.val()) {
            studentKeys = Object.entries(snapshot.val()).map(
              element => element[0]
            );
            studentKeys.forEach(element => {
              dbRef.ref(`Classrooms/${element}`).once('value', snapshot => {
                studentClassList.push(snapshot.val());
                console.log(studentKeys);
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

  refreshOnChange = () => {
    if (this.state.isAdmin) {
      dbRef.ref(`/Classrooms/`).on('child_added', snapshot => {
        this.createClassList();
      });
    } else {
      dbRef
        .ref(`/Users/Students/}/${this.state.user.uid}/enrolledClasses/`)
        .on('value', snapshot => {
          this.createClassList();
        });
    }
  };

  handleClick = e => {
    if (this.state.activateForm) {
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
    e.preventDefault();
    if (/\S/.test(this.state.userInput)) {
      this.state.isAdmin
        ? this.createClassroom(this.state.userInput)
        : this.classroomEnroll(this.state.userInput);
      this.setState({
        activateForm: false,
      });
    } else {
      console.log('User passed empty string');
    }
  };

  render() {
    return (
      <div className="classroomlist">
      <div className="Component--Title">
          <h2>Classroom List</h2>
        </div>
        {this.state.classList.map((element, i) => (
          <Link
            to={`/classroom/${this.state.classKeys[i]}`}
            key={this.state.classKeys[i]}
            params={{ user: this.state.user }}
          >
            <ClassroomListItem
              classroomName={element.classroomName}
              studentCount={Object.keys(element.enrolledStudents).length}
              key={this.state.classKeys[i]}
              password={this.state.classKeys[i].slice(1, 9)}
            />
          </Link>
        ))}

        <button
          type="button"
          onClick={this.handleClick}
          name={
            this.state.isAdmin
              ? 'classroomBeingCreated'
              : 'classroomBeingJoined'
          }
        >
          {this.state.isAdmin ? 'Add Classroom' : 'Join Classroom'}
        </button>

        {this.state.activateForm ? (
          <div>
            <label htmlFor="conditional-input">
              {this.state.isAdmin ? 'Create new classroom' : 'Join Classroom'}
            </label>
            <input
              type="text"
              min
              placeholder={
                this.state.isAdmin
                  ? 'Enter classroom name'
                  : 'Enter your classroom key'
              }
              id="conditional-input"
              onChange={this.handleChange}
              value={this.state.userInput}
              minLength={8}
            />
            <button type="button" onClick={this.conditionalAction}>
              Submit
            </button>
          </div>
        ) : null}

      </div>
    );
  }
}

export default ClassroomList;
