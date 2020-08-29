'use strict';

import React, { Component } from 'react';
import {hot} from 'react-hot-loader';

/**
* SettingsMenu - Class for the SettingsMenu component.
*/
class SettingsMenu extends Component {
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
      <section id="settings-menu">
      <h1>Settings</h1>
      <h3>Fiddly bits</h3>
      <div className="menu-content">
      <p>You'll get these eventually...</p>
      <p>...but just not today.</p>
      </div>
      {buttons}
      </section>
    );
  }
};

export default SettingsMenu;
