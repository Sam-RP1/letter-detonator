'use strict';

import React, { Component } from 'react';
import {hot} from 'react-hot-loader';

/**
* HowtoplayMenu - Class for the HowtoplayMenu component.
*/
class HowtoplayMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        {
          title: "Return",
          action: () => openMainMenu(),
        }
      ]
    };
  }

  render () {
    let buttons = this.state.buttons.map((button, i) => {
      return (
        <div key={i} className="menu-button" onClick={button.action}><p>{button.title}</p></div>
      )
    });

    return (
      <section id="htp-menu" className="sub-menu-container">
      <h1>How to play</h1>
      <h3 className="subheading">Guide</h3>
      <div className="menu-text">
      <p>Welcome to Letter Detonator! A game where you click letters to watch letters explode.</p>
      </div>
      {buttons}
      </section>
    );
  }
};

export default HowtoplayMenu;
