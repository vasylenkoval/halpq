import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase';

const dbRefAdmins = firebase.database().ref(`/Users/Admins`);
const dbRefStudents = firebase.database().ref(`/Users/Students`);
const dbRefClassrooms = firebase.database().ref(`/Classrooms`);
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    // Check if user was signed in before
    auth.onAuthStateChanged(result => {
      console.log(result);
      if (result) {
        this.setState({
          user: result,
        });
      }
      // Check if user is an Admin
      this.isAdmin();
    });
  }

  logIn = () => {
    auth.signInWithPopup(provider).then(result => {
      if (result) {
        this.setState({
          user: result.user,
        });
        // Check if new user
        if (result.additionalUserInfo.isNewUser) {
          firebase
            .database()
            .ref(`/Users/Students/${result.user.uid}`)
            .set({
              displayName: result.user.displayName,
              email: result.user.email,
              photoURL: result.user.photoURL,
              enrolledClasses: 0,
            });
        }
      }
    });
    // Check if Admin
    this.isAdmin();
  };

  logOut = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null,
      });
    });
  };

  // Method to check if the user is an Admin
  isAdmin = () => {
    firebase
      .database()
      .ref(`/Users/Admins/${this.state.user.uid}`)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          this.setState({
            isAdmin: true,
          });
          console.log('USER IS AN ADMIN');
        } else {
          console.log('USER IS A STUDENT');
        }
      });
  };

  // Convert user to an admin
  makeAdmin = studentUID => {
    firebase
      .database()
      .ref(`/Users/Students/${studentUID}`)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          firebase
            .database()
            .ref(`/Users/Admins/${studentUID}`)
            .set(snapshot.val());
          firebase
            .database()
            .ref(`/Users/Students/${studentUID}`)
            .remove();
          console.log(
            'USER IS PRESENT IN STUDENTS REF, MOVING TO ADMIN AND DELETING FROM STUDENTS'
          );
        } else {
          console.log('NO SUCH USER');
        }
      });
  };

  // Testing

  // Method to create a classroom - only avilable to admins in Classroom List view.
  createTestClassRoom = () => {
    firebase
      .database()
      .ref(`/Classrooms/`)
      .push({
        classRoomName: 'Test Classroom',
        classRoomQuestions: 0,
        enrolledStudents: 0,
      });
  };

  // Method to create a question in the classroom - needs a classroom reference. Should be moved to the HelpCue view.
  createTestQuestion = classroomRef => {
    firebase
      .database()
      .ref(`/Classrooms/${classroomRef}/classRoomQuestions`)
      .push({
        name: this.state.user.displayName,
        content: 'halp!',
        uid: this.state.user.uid,
        photoURL: this.state.user.photoURL,
        dateCreated: +new Date(),
        dateHelped: 0,
        dateCompleted: 0,
        isCompleted: false,
        location: 0,
      });
  };

  // Method to enroll in the classroom - should be moved to the Classroom List view.
  // Consider creating a duplicate shallow reference in the DB to store just the keys of the classrooms to prevent from downloading all nested data
  testEnroll = enrollPassword => {
    firebase
      .database()
      .ref(`/Classrooms`)
      .once('value', snapshot => {
        const classroomMatch = Object.entries(snapshot.val()).filter(element =>
          element[0].includes(enrollPassword)
        );
        console.log(classroomMatch);
        if (classroomMatch.length > 0) {
          // If there is a match - record a student in classroom ref
          firebase
            .database()
            .ref(
              `/Classrooms/${classroomMatch[0][0]}/enrolledStudents/${
                this.state.user.uid
              }`
            )
            .set('TEST');

          // Also record a class key in student's own profile
          firebase
            .database()
            .ref(
              `/Users/Students/${this.state.user.uid}/enrolledClasses/${
                classroomMatch[0][0]
              }`
            )
            .set('TEST');
        } else {
          console.log('Wrong key!');
        }
      });
  };

  render() {
    return (
      <div className="App">
        {this.state.user ? (
          <button onClick={this.logOut}>LogOut</button>
        ) : (
          <button onClick={this.logIn}>LogIn</button>
        )}
      </div>
    );
  }
}

export default App;
