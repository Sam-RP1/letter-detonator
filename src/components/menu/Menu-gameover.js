'use strict';

import React, { Component } from 'react';
import {hot} from 'react-hot-loader';

global.score = score;
global.level = level;
global.letters = letters;
global.end = end;

/**
* GameoverMenu - Class for the GameoverMenu component.
*/
class GameoverMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        {
          title: "Continue",
          action: () => this.isScoreTop10(),
        },
        {
          title: "Submit",
          action: () => this.reset(),
        },
      ],
      textLines: ["The letters overwhelmed you...", "You became alphabet soup...", "That was an alphabet beat down..."],
      takeInput: false,
      userName: "",
      userPlace: 0,
      userScore: 0,
      userLevel: 0
    };

    this.isScoreTop10 = this.isScoreTop10.bind(this);
    this.reset = this.reset.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  async isScoreTop10() {
    const [result, place] = await checkScore(score);
    if (result === true) {
      this.setState({
        takeInput: true,
        userPlace: place,
        userScore: score,
        userLevel: level
      })
    } else {
      this.reset()
    }
  }

  reset() {
    score = 0;
    level = 1;
    letters = [];
    end = false;
    clearMenu();
    document.getElementById('main-menu').style.display = 'flex';
    if (this.state.takeInput === true) {
      this.setState({
        takeInput: false,
        userName: "",
        userPlace: 0,
        userScore: 0,
        userLevel: 0
      })
    }
  }

  changeHandler(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async submitHandler(event) {
    event.preventDefault();
    await insertScore(this.state.userPlace, this.state.userName, this.state.userScore, this.state.userLevel)
    this.reset();
  }

  render () {
    let content;

    if (this.state.takeInput === false) {
      content = (
        <React.Fragment>
        <h3>{this.state.textLines[Math.floor(Math.random() * this.state.textLines.length)]}</h3>
        <div className="menu-button" onClick={this.state.buttons[0].action}><p>{this.state.buttons[0].title}</p></div>
        </React.Fragment>
      )
    } else {
      content = (
        <React.Fragment>
        <h3>New High Score</h3>
        <form onSubmit={this.submitHandler}>
        <p>Enter Your Nickname:</p>
        <input className="name-input" name="userName" type="text" onChange={this.changeHandler} placeholder="Enter Nickname Here" minLength="3" maxLength="10" required />
        <input className="menu-button" type="submit" value={this.state.buttons[1].title} />
        </form>
        </React.Fragment>
      )
    }

    return (
      <section id="game-over-menu">
      <h1>GAME OVER</h1>
      {content}
      </section>
    );
  }
};

export default GameoverMenu;
