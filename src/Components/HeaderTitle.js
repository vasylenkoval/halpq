import React, { Component } from 'react';
import Typist from 'react-typist';

class HeaderTitle extends Component {
  constructor() {
    // console.log('the constructor was called');
    super();
    this.state = {};
  }

  HeaderTitleStyle = {
    fontSize: '45px',
    float: 'left',
    margin: '50px 50px 0 0',
  };

  componentDidMount() {
    // const strings = ['HALPQ', 'Classroom List'];
    // const options = {
    //   strings,
    //   typeSpeed: 50,
    //   backSpeed: 50,
    // };
  }

  render() {
    return (
      <div className="header__title">
        <Typist>
          <h1>HALPQ</h1>
          <div className="container">
            <Typist.Backspace count={0} typeSpeed={70} delay={1000} />
            <h4> A place to ask your HackerYou questions. </h4>
          </div>
        </Typist>
      </div>
    );
  }
}

export default HeaderTitle;
