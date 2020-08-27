'use strict';

import React, { Component } from 'react';
import {hot} from 'react-hot-loader';
import '../../styles/root.scss';
import './Menu.scss';

/**
* MainMenu - Class for the MainMenu component.
*/
class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        {
          title: "Start",
          action: () => startGame(),
        },
        {
          title: "Highscores",
          action: () => openHighscores(),
        },
        {
          title: "How to play",
          action: () => openHowToPlay(),
        },
        {
          title: "Controls",
          action: () => openControls(),
        },
        {
          title: "Settings",
          action: () => openSettings(),
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
      <section id="main-menu" className="sub-menu-container">
      <h1>Letter Detonator</h1>
      <h3 className="subheading">By <a href="http://srenshawpanting.co.uk/" target="_blank">SRP</a></h3>
      {buttons}
      </section>
    )
  }
};

export default MainMenu;
