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
      this.testEnroll('-LSx5XK-TR');
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
          dbRefStudents.child(result.user.uid).set({
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
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

  // Testing
  createTestClassRoom = () => {
    dbRefClassrooms.push({
      classRoomName: 'Test Classroom',
      classRoomQuestions: 0,
      enrolledStudents: 0,
    });
  };

  createTestQuestion = classroomRef => {
    dbRefClassrooms
      .child(classroomRef)
      .child('classRoomQuestions')
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

  testEnroll = enrollPassword => {
    dbRefClassrooms.once('value', snapshot => {
      const classroomRef = Object.entries(snapshot.val()).filter(element =>
        element[0].includes(enrollPassword)
      );
      console.log(classroomRef);
      if (classroomRef.length > 0) {
        dbRefClassrooms
          .child(classroomRef[0][0])
          .child('enrolledStudents')
          .child(this.state.user.uid)
          .set('test2');
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
