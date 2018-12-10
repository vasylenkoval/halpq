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
        console.log(result);
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
          isAdmin: false,
          appReady: true,
        });
        console.log('USER IS A STUDENT');
      }
    });
  };

  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Header user={this.state.user} isAdmin={this.state.isAdmin} />
            {this.state.user === null ? (
              <button onClick={this.logIn}>LogIn</button>
            ) : null}

            {this.state.user !== null ? (
              this.state.appReady ? (
                <div>
                  <button onClick={this.logOut}>LogOut</button>
                  <Route
                    exact
                    path="/"
                    component={() => (
                      <ClassroomList
                        isAdmin={this.state.isAdmin}
                        user={this.state.user}
                      />
                    )}
                  />
                  {this.state.isAdmin ? (
                    <Route path="/usermanagement" component={UserManagement} />
                  ) : (
                    <Route path="/usermanagement" component={UserManagement} />
                    // switch it back to 404 pls
                  )}
                  <Route
                    path="/classroom/:classroomid"
                    render={props => (
                      <Halpq
                        user={this.state.user}
                        isAdmin={this.state.isAdmin}
                        {...props}
                      />
                    )}
                  />
                </div>
              ) : null
            ) : null}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
