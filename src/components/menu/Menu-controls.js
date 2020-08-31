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
      ],
      controls: [
        { key: "KEY", action: "ACTION" },
        { key: "Escape (ESC)", action: "Open pause menu while playing" },
        { key: "a-z", action: "Detonate corresponding letter" }
      ]
    };
  }

  render () {
    let buttons = this.state.buttons.map((button, i) => {
      return (
        <div key={i} className="menu-button" onClick={button.action}><p>{button.title}</p></div>
      )
    });

    let controls = this.state.controls.map((control, i) => {
      return (
        <div key={i} className="control-entry">
        <p>{control.key}:</p>
        <p> {control.action}</p>
        </div>
      )
    })

    return (
      <section id="controls-menu">
      <h1>Controls</h1>
      <h3>You'll need these</h3>
      <div className="menu-content">
      {controls}
      </div>
      {buttons}
      </section>
    );
  }
};

export default ControlsMenu;
