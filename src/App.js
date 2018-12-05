import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
const dbRef = firebase.database();

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
      this.makeStudent('800RdWEbEGPUxV3ef8y24CoYIa02');
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
    dbRef
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

  // Convert student to an admin
  makeAdmin = studentUID => {
    dbRef.ref(`/Users/Students/${studentUID}`).once('value', snapshot => {
      if (snapshot.exists()) {
        dbRef.ref(`/Users/Admins/${studentUID}`).set(snapshot.val());
        dbRef.ref(`/Users/Students/${studentUID}`).remove();
        console.log(
          'USER IS PRESENT IN STUDENTS REF, MOVING TO ADMIN AND DELETING FROM STUDENTS'
        );
      } else {
        console.log('NO SUCH USER');
      }
    });
  };

  // Conver Admin to Student

  makeStudent = adminUID => {
    dbRef.ref(`/Users/Admins/${adminUID}`).once('value', snapshot => {
      if (snapshot.exists()) {
        dbRef.ref(`/Users/Students/${adminUID}`).set(snapshot.val());
        dbRef.ref(`/Users/Admins/${adminUID}`).remove();
        console.log(
          'USER IS PRESENT IN STUDENTS REF, MOVING TO ADMIN AND DELETING FROM STUDENTS'
        );
      } else {
        console.log('NO SUCH ADMIN');
      }
    });
  };

  // Testing

  // Method to create a classroom - only avilable to admins in Classroom List view.
  createTestClassRoom = () => {
    dbRef.ref(`/Classrooms/`).push({
      classRoomName: 'Test Classroom',
      classRoomQuestions: 0,
      enrolledStudents: 0,
    });
  };

  // Method to create a question in the classroom - needs a classroom reference. Should be moved to the HelpCue view.
  createTestQuestion = classroomRef => {
    dbRef.ref(`/Classrooms/${classroomRef}/classRoomQuestions`).push({
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
          .set('TEST');

        // Also record a class key in student's own profile
        dbRef
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
