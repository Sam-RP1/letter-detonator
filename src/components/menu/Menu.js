'use strict';

import React, { Component } from 'react';
import {hot} from 'react-hot-loader';
import '../../styles/root.scss';
import './Menu.scss';

import HighscoreMenu from './Menu-highscore.js';
import HowtoplayMenu from './Menu-howtoplay.js';
import ControlsMenu from './Menu-controls.js';
import SettingsMenu from './Menu-settings.js';
import PauseMenu from './Menu-pause.js';
import GameoverMenu from './Menu-gameover.js';

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
          action: () => startGame(),
        },
        {
          title: "Highscores",
          action: () => this.setHighscores(),
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
          action: () => this.setSettings(),
        }
      ],
      highscores: [],
      settings: {}
    };

    this.setHighscores = this.setHighscores.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.checkDisplaySize = this.checkDisplaySize.bind(this);
  }

  async setHighscores() {
    await fetchHighscores().then(response => {
      this.setState({
        highscores: response
      })
    });
    openHighscores();
  }

  async setSettings() {
    await fetchSettings().then(async response => {
      await this.setState({
        settings: response
      })
    });
    openSettings();
  }

  checkDisplaySize() {}

  render () {
    let buttons = this.state.buttons.map((button, i) => {
      return (
        <div key={i} className="menu-button" onClick={button.action}><p>{button.title}</p></div>
      )
    });

    return (
      <div id="menu-modal">
      <section id="main-menu">
      <h1>Letter Detonator</h1>
      <h3>By <a href="http://srenshawpanting.co.uk/" target="_blank">SRP</a></h3>
      <p className="warning">This game requires a keyboard to be played!</p>
      {buttons}
      </section>
      <HighscoreMenu scores={this.state.highscores} />
      <HowtoplayMenu />
      <ControlsMenu />
      <SettingsMenu currentSettings={this.state.settings} fetchSettings={fetchSettings} />
      <PauseMenu />
      <GameoverMenu />
      </div>
    )
  }
};

const fetchHighscores = async () => {
  let scoresArr = [];
  const scoresJSON = await getStorageEntry('scores');
  for (let i = 1; i < 11; i ++) {
    scoresArr.push(scoresJSON[i])
  }
  return scoresArr;
}

const fetchSettings = async () => {
  const playerCharacterJSON = await getStorageEntry('playerCharacter');
  const letterJSON = await getStorageEntry('letter');
  const split = letterJSON.font.split(" ");
  return { font: split[1], fontSize: split[0], playerCharacterName: playerCharacterJSON.name, playerCharacterId: playerCharacterJSON.id };
}

export default Menu;
