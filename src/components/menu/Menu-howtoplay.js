'use strict';

import React, { Component } from 'react';
import {hot} from 'react-hot-loader';

import character from '../../assets/img/character-center.png';
import clickingBanner from '../../assets/img/clicking-banner.png';
import gameoverBanner from '../../assets/img/gameover-banner.png';
import levelAndScoreBanner from '../../assets/img/level-and-score.png';

/**
* HowtoplayMenu - Class for the HowtoplayMenu component.
*/
class HowtoplayMenu extends Component {
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
      <section id="htp-menu">
      <h1>How to play</h1>
      <h3>Guide</h3>
      <div className="menu-content">
      <p className="center">Welcome to Letter Detonator!</p>
      <p>The objective of the game is simple, reach a high level and achieve a high score by surviving the endless letter onslaught as long as possible.</p>
      <p>To survive the letter onslaught you must protect your character found at the center of the screen.</p>
      <img src={character} alt="Your character"></img>
      <p>To protect your character you must detonate letters causing them explode by correctly pressing the corresponding letter key on your keyboard.</p>
      <img src={clickingBanner} alt="Click the letter to detonate it and make it explode"></img>
      <p>Each time you successfully detonate a letter your score will increase by 1. However, each time you detonate a letter that is not present your score will decrease by 1.</p>
      <p>Currently the game has ten levels and each time you reach a new level the games difficulty will increase. This difficulty increase could result in a greater chance of a new letter appearing and/or the maximum number of letters that can be present at a time increasing.</p>
      <p>You can find your current level and score located at the top left of the screen when playing.</p>
      <img src={levelAndScoreBanner} alt="Level and score are located in the top left"></img>
      <p>The game is over when a letter gets too close to your character!</p>
      <img src={gameoverBanner} alt="When a letter gets too close your character the game ends"></img>
      <p className="center">Good luck & happy detonating!</p>
      </div>
      {buttons}
      </section>
    );
  }
};

export default HowtoplayMenu;
