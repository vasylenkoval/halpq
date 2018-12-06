import React from 'react';
import { render } from 'react-dom';
import Typed from 'react-typed';

import Regitact, { Component } from 'react';

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
        <h1>Typed.js</h1>
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
