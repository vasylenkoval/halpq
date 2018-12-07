import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import ClassroomListItem from './ClassroomListItem';

const dbRef = firebase.database();

class ClassroomList extends Component {
  constructor(props) {
    console.log('the constructor in Classroom List was called');
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

  createClassroom = name => {
    const dbRef = firebase.database();
    dbRef.ref(`/Classrooms/`).push({
      classroomName: name,
      classroomQuestions: 0,
      enrolledStudents: 0,
    });
  };

  classroomEnroll = enrollPassword => {
    const dbRef = firebase.database();
    dbRef.ref(`/Classrooms`).once('value', snapshot => {
      const classroomMatch = Object.entries(snapshot.val()).filter(element =>
        element[0].includes(enrollPassword)
      );
      console.log(classroomMatch);
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
    const classArr = [];
    let keys = [];

    dbRef
      .ref(
        `Users/${this.state.isAdmin ? 'Admins' : 'Students'}/${
          this.state.user.uid
        }/enrolledClasses`
      )
      .once('value', snapshot => {
        if (snapshot.val()) {
          keys = Object.entries(snapshot.val()).map(element => element[0]);

          keys.forEach(element => {
            dbRef.ref(`Classrooms/${element}`).once('value', snapshot => {
              classArr.push(snapshot.val());
              this.setState({
                classList: classArr,
                classKeys: keys,
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
  };

  refreshOnChange = () => {
    dbRef
      .ref(
        `/Users/${this.state.isAdmin ? `Admins` : `Students`}/${
          this.state.user.uid
        }/enrolledClasses/`
      )
      .on('value', snapshot => {
        this.createClassList();
      });
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

  joinClassroom = e => {
    e.preventDefault();
    if (/\S/.test(this.state.userInput)) {
      this.classroomEnroll(this.state.userInput);
      this.setState({
        activateForm: false,
      });
    } else {
      console.log('SUP');
    }
  };

  render() {
    return (
      <div className="classroomlist">
        {this.state.classList.map((element, i) => (
          <ClassroomListItem
            classroomName={element.classroomName}
            studentCount={Object.keys(element.enrolledStudents).length}
            key={this.state.classKeys[i]}
            password={this.state.classKeys[i].slice(1, 9)}
          />
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
            <label htmlFor="conditional-input">Join Classroom</label>
            <input
              type="text"
              min
              placeholder="Enter your classroom key"
              id="conditional-input"
              onChange={this.handleChange}
              value={this.state.userInput}
              minLength={8}
            />
            <button type="button" onClick={this.joinClassroom}>
              Submit
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ClassroomList;
