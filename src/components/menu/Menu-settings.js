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
          fontSize: ["18px", "20px", "22px", "24px"],
          playerCharacter: [
            { name: "Blue Alien", id: 0 },
            { name: "White Alien", id: 1 },
            { name: "Pink Alien", id: 2 }
          ],
        },
        selected: {
          font: "",
          fontSize: "",
          playerCharacter: {},
        }
      },
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchSettings().then(response => {
      this.setState(prevState => ({
        settings: {
          ...prevState.settings,
          selected: {
            font: response.font,
            fontSize: response.fontSize,
            playerCharacter: { name: response.playerCharacterName, id: response.playerCharacterId },
          }
        }
      }));
    });
  }

  changeHandler(event) {
    const name = event.target.name;
    let value = event.target.value;

    if (value.substring(0,1) === '{') {
      value = JSON.parse(value);
    }

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
    const font = this.state.settings.selected.fontSize + " " + this.state.settings.selected.font;
    await setSetting("playerCharacter", this.state.settings.selected.playerCharacter, playerCharacter)
    await setSetting("letter", { font: font }, letter)
    openMainMenu()
  }

  render () {
    let name = this.props.currentSettings.playerCharacterName;
    let id = this.props.currentSettings.playerCharacterId;

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
      <div className="settings-content">
      <form onSubmit={this.submitHandler}>
      <label>Select a font:
      <select name="font" value={this.state.settings.selected.font} onChange={this.changeHandler}>
      {fontDropDown}
      </select>
      </label>
      <label>Select a font size:
      <select name="fontSize" value={this.state.settings.selected.fontSize} onChange={this.changeHandler}>
      {fontSizeDropDown}
      </select>
      </label>
      <label>Select a character:
      <select name="playerCharacter" value={JSON.stringify(this.state.settings.selected.playerCharacter)} onChange={this.changeHandler}>
      {characterDropDown}
      </select>
      </label>
      <input className="menu-button" type="submit" value="Save" />
      </form>
      </div>
      {buttons}
      </section>
    );
  }
};

export default SettingsMenu;
