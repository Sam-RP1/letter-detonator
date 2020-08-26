'use strict';

import React, { Component } from 'react';
import {hot} from 'react-hot-loader';

/**
* HighscoreMenu - Class for the HighscoreMenu component.
*/
class HighscoreMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        {
          title: "Return",
          action: () => openHome(),
        }
      ],
      highscores: []
    };
  }

  componentDidMount() {
    fetchHighscores().then(response => {
      this.setState({
        highscores: response
      })
    });
  }

  render () {
    let buttons = this.state.buttons.map((button, i) => {
      return (
        <div key={i} className="menu-button" onClick={button.action}><p>{button.title}</p></div>
      )
    });

    let scores = this.state.highscores.map((score, i) => {
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
      <section id="high-score-menu" className="sub-menu-container">
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
      </section>
    );
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

export default HighscoreMenu;
