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
      ],
      settings: {
        options: {
          font: ["Arial", "Courier", "Georgia", "Impact", "Monaco", "serif", "Tahoma", "Verdana"],
          fontSize: [18, 20, 22, 24],
          playerCharacter: [
            { name: "Blue Alien", id: 0 },
            { name: "White Alien", id: 1 },
            { name: "Pink Alien", id: 2 }
          ],
        },
        default: {
          font: "Courier",
          fontSize: "20px",
          playerCharacter: { name: "Blue Alien", id: 0 },
        },
        selected: {
          font: "",
          fontSize: "",
          playerCharacter: {},
        }
      }
    };
    this.resetHandler = this.resetHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(event) {
    console.log("CHANGING SETTINGS")
    console.log(event.target.name)
    console.log(event.target.value)
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      settings: {
        ...prevState.settings,
        selected: {
          ...prevState.settings.selected,
          [name]: value
        }
      }
    }));
  }

  async submitHandler(event) {
    event.preventDefault();
    console.log("SAVE SETTINGS")
    // DO error checking and validation checks
    // Make a function to update and save these settings
    // Test by changing and closing browser then reopening game, play game and check settings

    // await insertScore(this.state.userPlace, this.state.userName, this.state.userScore, this.state.userLevel)
    // this.reset();
  }

  resetHandler() {
    console.log("RESET SETTINGS")
    console.log(this.state.settings.selected)
  }

  render () {
    console.log(this.state.settings.selected)
    let buttons = this.state.buttons.map((button, i) => {
      return (
        <div key={i} className="menu-button" onClick={button.action}><p>{button.title}</p></div>
      )
    });

    let fontDropDown = this.state.settings.options.font.map((font, i) => {
      return (
        <option key={i} value={font}>{font}</option>
      )
    })

    let fontSizeDropDown = this.state.settings.options.fontSize.map((size, i) => {
      return (
        <option key={i} value={size}>{size}</option>
      )
    })

    let characterDropDown = this.state.settings.options.playerCharacter.map((character, i) => {
      return (
        <option key={i} value={JSON.stringify({ name: character.name, id: character.id })}>{character.name}</option>
      )
    })

    return (
      <section id="settings-menu">
      <h1>Settings</h1>
      <h3>Fiddly bits</h3>
      <div className="menu-content">
      <form onSubmit={this.submitHandler}>
      <label for="font">Select a font:</label>
      <select id="font" name="font" onChange={this.changeHandler}>
      {fontDropDown}
      </select>
      <label for="fontSize">Select a font size:</label>
      <select id="fontSize" name="fontSize" onChange={this.changeHandler}>
      {fontSizeDropDown}
      </select>
      <label for="playerCharacter">Select a character:</label>
      <select id="playerCharacter" name="playerCharacter" onChange={this.changeHandler}>
      {characterDropDown}
      </select>
      <input className="menu-button" type="submit" value="Save" />
      <input className="menu-button" type="submit" onClick={() => this.resetHandler()} value="Reset to Defaults" />
      </form>
      </div>
      {buttons}
      </section>
    );
  }
};

export default SettingsMenu;
