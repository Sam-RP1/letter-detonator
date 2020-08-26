'use strict';

import React, { Component } from 'react';
import {hot} from 'react-hot-loader';
import '../../styles/root.scss';
import './Menu.scss';

import HomeMenu from './Menu-home.js';
import HighscoreMenu from './Menu-highscore.js';
import PauseMenu from './Menu-pause.js';
import GameoverMenu from './Menu-gameover.js';

/**
* Menu - Class for the Menu component.
*/
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div id="menu-modal">
        <HomeMenu />
        <HighscoreMenu />
        <PauseMenu />
        <GameoverMenu />
      </div>
    );
  }
};

export default Menu;
