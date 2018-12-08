import React, { Component } from 'react';

// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
class Context extends Component {
  state = {
    activePage: '',
  };

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          exampleFunction: () =>
            this.setState({
              age: this.state.addToState + 1,
            }),
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
