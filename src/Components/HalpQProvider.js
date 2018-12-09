import React, { Component } from 'react';
import firebase from './firebase';

const provider = new firebase.auth.GoogleAuthProvider();

// first we will make a new context
const HalpQContext = React.createContext();

// Then create a provider Component
class HalpQProvider extends Component {
  state = {
    activePage: '',
    isAdmin: null,
    isUser: null,
  };

  render() {
    return (
      <HalpQContext.Provider
        value={{
          state: this.state,
          isAdmin: () =>
            this.setState({
              isUser: 'test',
            }),
        }}
      >
        {this.props.children}
      </HalpQContext.Provider>
    );
  }
}

export default HalpQProvider;
