'use strict';

import React, { Component } from 'react';
import {hot} from 'react-hot-loader';
import '../../styles/root.scss';
import './Menu.scss';

/**
* Menu - Class for the Menu component.
*/
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        {
          title: "Start",
          action: this.startGame(),
        },
        {
          title: "Highscores",
          action: "",
        },
        {
          title: "How to play",
          action: "",
        },
        {
          title: "Controls",
          action: "",
        },
        {
          title: "Settings",
          action: "",
        }
      ]
    };

    this.startGame = this.startGame.bind(this)
  }

  startGame() {
    console.log("START")
  }

  render () {
    let buttons = this.state.buttons.map((button, i) => {
      return (
        <div key={i} className="menu-button" onClick={button.action}><p>{button.title}</p></div>
      )
    });

    return (
      <div id="menu-modal">
        <h1>Letter Detonator</h1>
        <h3 className="subheading">By <a href="http://srenshawpanting.co.uk/" target="_blank">SRP</a></h3>
        {buttons}
      </div>
    );
  }
};

export default Menu;
