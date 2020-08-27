'use strict';

import React, { Component } from 'react';
import {hot} from 'react-hot-loader';

/**
* ControlsMenu - Class for the ControlsMenu component.
*/
class ControlsMenu extends Component {
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
      <section id="controls-menu" className="sub-menu-container">
      <h1>Controls</h1>
      <h3 className="subheading">You'll need these</h3>
      <div className="menu-text">
      <p>Controls here</p>
      </div>
      {buttons}
      </section>
    );
  }
};

export default ControlsMenu;