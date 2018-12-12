import React, { Component } from 'react';
import Typist from 'react-typist';

const cursor = {
  show: true,
  blink: true,
  hideWhenDone: true,
};

class HeaderTitle extends Component {
  constructor() {
    // console.log('the constructor was called');
    super();
    this.state = {};
  }

  render() {
    return <div className="header__title">
        <h1>HALPQ</h1>
        <div className="header__titleContainer">
          <Typist cursor={cursor} onTypingDone={this.typeLoop}>
            <span>
              A place to ask your <span className="subtitle--red">
                HackerYou
              </span> questions.
            </span>
            <Typist.Backspace count={20} delay={1000} />
            <span>
              <span className="subtitle--red">coding</span> questions.
            </span>
            <Typist.Backspace count={17} delay={1000} />
            <span>
              <span className="subtitle--red">design</span> questions.
            </span>
            <Typist.Backspace count={17} delay={1000} />
            <span>
              <span className="subtitle--red">Javascript</span> questions.
            </span>
            <Typist.Backspace count={21} delay={1000} />
            <span>
              <span className="subtitle--red">HTML</span> questions.
            </span>
            <Typist.Backspace count={15} delay={1000} />
            <span>
              <span className="subtitle--red">CSS</span> questions.
            </span>
            <Typist.Backspace count={14} delay={1000} />
            <span>
              <span className="subtitle--red">HackerYou</span> questions.
            </span>
          </Typist>
        </div>
      </div>;
  }
}

export default HeaderTitle;
