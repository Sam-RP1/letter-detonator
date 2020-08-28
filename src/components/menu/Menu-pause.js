'use strict';

import React, { Component } from 'react';
import {hot} from 'react-hot-loader';

/**
* PauseMenu - Class for the PauseMenu component.
*/
class PauseMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        {
          title: "Continue",
          action: () => continueGame(),
        },
        {
          title: "Restart",
          action: () => restartGame(),
        },
        {
          title: "Quit",
          action: () => quitGame(),
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
      <section id="pause-menu" className="sub-menu-container">
      <h1>Paused</h1>
      {buttons}
      </section>
    );
  }
};

export default PauseMenu;
