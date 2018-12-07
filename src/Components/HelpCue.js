import React, { Component } from "react";

class HelpCue extends Component {
  constructor() {
    console.log("the constructor in HelpCue was called");
    super();
    this.state = {};
  }
  render() {
      return(
        <div className="wrapper">
        <h2>HELPCUE</h2>
        </div>
      )
  }
}

export default HelpCue;
