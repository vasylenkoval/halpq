import React, { Component } from 'react';
import firebase from '../firebase';

const dbRef = firebase.database();

// Classroom item inside of the Classroom List
const ClassroomListItem = props => (
  <div className="classroomlist__item">
    <div className="classroomlist__item__name">
      <h2>{props.classroomName}</h2>
    </div>

    <div className="classroomlist__item__questions">
      <div className="classroomlist__item__questions__count">
        <p>Active questions: to be passed</p>
      </div>
    </div>

    <div className="classroomlist__item__beinghelped">
      <div className="classroomlist__item__beinghelped__count">
        <p>Being helped questions: to be passed</p>
      </div>
    </div>

    <div className="clasroom__item__password">
      <p>Password: {props.password}</p>
    </div>

    <div className="classroomlist__item__studentsEnrolled">
      <p>Number of Students: {props.studentCount}</p>
    </div>
    <button>Enter</button>
  </div>
);

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
      .on('value', snapshot => {
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
      });
  };

  handleClick = e => {
    this.setState({
      activateForm: true,
    });
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
    console.log(
      this.state.classList.map(element =>
        Object.entries(element.classroomQuestions)
          .map(element => element[1].isBeingHelped)
          .filter(element => element[0] === true)
      )
    );
    return (
      <div className="classroomlist">
        {this.state.classList.map((element, i) => (
          <ClassroomListItem
            classroomName={element.classroomName}
            studentCount={Object.keys(element.enrolledStudents).length}
            key={this.state.classKeys[i]}
            password={this.state.classKeys[i].slice(0, 7)}
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

        <div>
          <label htmlFor="conditional-input">Join Classroom</label>
          <input
            type="text"
            placeholder="Enter your classroom key"
            id="conditional-input"
            onChange={this.handleChange}
            value={this.state.userInput}
          />
          <button type="button" onClick={this.joinClassroom}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default ClassroomList;
