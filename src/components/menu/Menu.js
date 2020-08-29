'use strict';

import React, { Component } from 'react';
import {hot} from 'react-hot-loader';
import '../../styles/root.scss';
import './Menu.scss';

// import MainMenu from './Menu-main.js';
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
          action: () => openSettings(),
        }
      ],
      highscores: [],
      textTest: "hello"
    };

    this.setHighscores = this.setHighscores.bind(this);
    this.checkDisplaySize = this.checkDisplaySize.bind(this);
  }

  componentDidMount() {
    fetchHighscores().then(response => {
      this.setState({
        highscores: response
      })
    });
  }

  async setHighscores() {
    await fetchHighscores().then(response => {
      this.setState({
        highscores: response
      })
    });
    openHighscores();
  }

  checkDisplaySize() {

  }

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
      <h3 className="warning">This game requires a keyboard to be played!</h3>
      {buttons}
      </section>
      <HighscoreMenu scores={this.state.highscores} />
      <HowtoplayMenu />
      <ControlsMenu />
      <SettingsMenu />
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

export default Menu;
