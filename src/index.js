import React from "react";
import ReactDOM from "react-dom";

import Menu from './components/menu/Menu.js';

const load = async () => {
  const isInitialised = checkInitialised();
  // 1. Check if the game has ever been initialised on this device
  if (isInitialised === false) {
    console.log("INITIALISING")
    // A. If it has not we need to create all the possible entries using defaults
    await createStorageEntry('playerCharacter', gameDefaults.playerCharacter);
    await createStorageEntry('letter', gameDefaults.letter);
    await createStorageEntry('tracker', gameDefaults.tracker);
    await createStorageEntry('particleProperties', gameDefaults.particleProperties);
    await createStorageEntry('scores', gameDefaults.scores)
    await createStorageEntry('initialised', gameDefaults.initialised)
  } else {
    // B. If it has been initialised then we need to load all the dat and variables for the game
    console.log("GAME ALREADY INITIALISED")
  }
  await setSettings({
    prop: [playerCharacter, letter, tracker, particleProperties],
    key: ['playerCharacter', 'letter', 'tracker', 'particleProperties']
  });
  ReactDOM.render(<Menu />, document.getElementById('modal-container'));
}

window.onload = load;
