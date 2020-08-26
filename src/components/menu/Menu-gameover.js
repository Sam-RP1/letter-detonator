'use strict';

import React, { Component } from 'react';
import {hot} from 'react-hot-loader';

/**
* GameoverMenu - Class for the GameoverMenu component.
*/
class GameoverMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        {
          title: "Continue",
          action: () => openHome(),
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
      <section id="game-over-menu" className="sub-menu-container">
      <h1>GAME OVER</h1>
      <h3 className="subheading">Score: {score}</h3>
      {buttons}
      </section>
    );
  }
};

export default GameoverMenu;
