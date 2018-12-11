import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from './firebase';
// COMPONENTS
import Header from './Components/Header';
import ClassroomList from './Components/ClassroomList';
import UserManagement from './Components/UserManagement';
import Halpq from './Components/Halpq';
import NotFound from './Components/NotFound';

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
    dbRef.ref(`/Users/Admins/${this.state.user.uid}`).on('value', snapshot => {
      if (snapshot.exists()) {
        this.setState({
          isAdmin: true,
          appReady: true,
        });
      } else {
        this.setState({
          isAdmin: false,
          appReady: true,
        });
      }
    });
  };

  render() {
    const { user, isAdmin, appReady } = this.state;
    return (
      <div>
        <Router>
          <div className="App">
            <Header user={user} isAdmin={isAdmin} logOut={this.logOut} />
            {user && appReady ? (
              <div>
                <Route
                  exact
                  path="/"
                  component={() => (
                    <ClassroomList isAdmin={isAdmin} user={user} />
                  )}
                />
                {isAdmin ? (
                  <Route path="/usermanagement" component={UserManagement} />
                ) : (
                  <Route path="/usermanagement" component={UserManagement} />
                  // switch it back to 404 pls
                )}
                <Route
                  path="/classroom/:classroomid"
                  render={props => (
                    <Halpq user={user} isAdmin={isAdmin} {...props} />
                  )}
                />
              </div>
            ) : (
              <div className="logIn">
                <button className="logIn__button" onClick={this.logIn}>LogIn</button>

              </div>
            )}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
