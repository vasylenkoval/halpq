import React, { Component } from 'react';
import Typed from 'react-typed';

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
    const strings = ['HALPQ', 'Classroom List'];

    const options = {
      strings,
      typeSpeed: 50,
      backSpeed: 50,
    };
    // this.typed.start();
  }

  render() {
    return (
      <div className="wrap">
        <h1>This is where TypeJS Goes</h1>
        <div className="type-wrap">
          <span
            style={{ whiteSpace: 'pre' }}
            ref={el => {
              this.el = el;
            }}
          />
        </div>
      </div>
    );
  }
}

export default HeaderTitle;
