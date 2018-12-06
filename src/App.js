import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase';
import ClassroomList from './Components/ClassroomList';

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
      if (result) {
        this.setState(
          {
            user: result,
          },
          () => {
            this.isAdmin();
          }
        );
      }
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
          dbRef.ref(`/Users/Students/${result.user.uid}`).set({
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            enrolledClassrooms: 0,
          });
        }
      }
    });
  };

  logOut = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null,
        isAdmin: null,
      });
    });
  };

  // Method to check if the user is an Admin
  isAdmin = () => {
    dbRef
      .ref(`/Users/Admins/${this.state.user.uid}`)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          this.setState(
            {
              isAdmin: true,
            },
            () => {
              this.setState({
                appReady: true,
              });
            }
          );
          console.log('USER IS AN ADMIN');
        } else {
          this.setState({
            appReady: true,
          });
          console.log('USER IS A STUDENT');
        }
      });
  };

  render() {
    return (
      <div className="App">
        {this.state.appReady ? (
          <ClassroomList isAdmin={this.state.isAdmin} user={this.state.user} />
        ) : null}
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
