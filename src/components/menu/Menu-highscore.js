'use strict';

import React, { Component } from 'react';
import {hot} from 'react-hot-loader';

/**
* HighscoresMenu - Class for the HighscoresMenu component.
*/
class HighscoresMenu extends Component {
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

    let scores = this.props.scores.map((score, i) => {
      return (
        <div key={i} className="leaderboard-entry">
        <p>{i+1}</p>
        <p>{score.name}</p>
        <p>{score.level}</p>
        <p>{score.score}</p>
        <p>{score.achieved}</p>
        </div>
      )
    });

    return (
      <React.Fragment>
      <h1>High Scores</h1>
      <h3 className="subheading">Letter Eliminators</h3>
      <div className="leaderboard">
      <div className="leaderboard-titles">
      <p>#</p>
      <p>Name</p>
      <p>Level</p>
      <p>Score</p>
      <p>Achieved</p>
      </div>
      {scores}
      </div>
      {buttons}
      </React.Fragment>
    );
  }
};

export default HighscoresMenu;
