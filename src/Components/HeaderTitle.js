import React, { Component } from 'react';
import Typist from 'react-typist';

const cursor = {
  show: true,
  blink: true,
};

class HeaderTitle extends Component {
  constructor() {
    // console.log('the constructor was called');
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="header__title">
        <h1>HALPQ</h1>
        <div className="header__titleContainer">
          <Typist cursor={cursor} onTypingDone={this.typeLoop}>
            <span>A place to ask your HackerYou questions. </span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions.</span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions. </span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions.</span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions. </span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions.</span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions. </span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions.</span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions. </span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions.</span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions. </span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions.</span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions. </span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions.</span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions. </span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions.</span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions. </span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions.</span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions. </span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions.</span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions. </span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions.</span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions. </span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions.</span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions. </span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions.</span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions. </span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions.</span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions. </span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions.</span>
            <Typist.Backspace count={41} delay={3000} />
            <span>A place to ask your HackerYou questions.</span>
            
          </Typist>
        </div>
      </div>
    );
  }
}

export default HeaderTitle;
