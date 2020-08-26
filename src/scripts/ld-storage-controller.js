const ldStorage = window.localStorage;

if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
    hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
    dontEnums = [
      'toString',
      'toLocaleString',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'constructor'
    ],
    dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}

// Default Game Settings & Variables
const gameDefaults = {
  playerCharacter: {
    radius: 15,
    color: '#000'
  },
  letter: {
    font: '20px Courier',
    color: '#0080b3',
    size: 30,
    chance: 0.01,
    maxSpeed: 1.5,
    minSpeed: 0.5
  },
  tracker: {
    font: '24px Arial',
    color: '#0080b3',
    x: 15,
    y: 30
  },
  particleProperties: {
    shrink: 0.15,
    maxAlpha: 0.8,
    maxRadius: 5,
    maxSpeedX: 3,
    maxSpeedY: 3,
    minAlpha: 0.3,
    minRadius: 1,
    minSpeedX: -3,
    minSpeedY: -3,
    total: 100
  },
  scores: [
    "Test User",
    "0",
    "achieved: 25/08/2020"
  ],
  initialised: "1"
};

// Customisable Settings & Variables
const playerCharacter = {};
const letter = {};
const tracker = {};
const particleProperties = {};

const createStorageEntry = (key, value) => {
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      ldStorage.setItem(key, value.toString());
    } else {
      ldStorage.setItem(key, JSON.stringify(value));
    }
  } else {
    ldStorage.setItem(key, value);
  }
}

const getStorageEntry = (key) => {
  let value = ldStorage.getItem(key);
  if (value.substring(0,1) === '{') {
    return JSON.parse(value);
  } else {
    return value.split(',');
  }
}

const clearStorage = () => {
  ldStorage.clear();
}

const checkInitialised = () => {
  const initialised = ldStorage.getItem('initialised');
  const answer = initialised === "1" ? true : false;
  return answer;
}

const setSettings = (array) => {
  for (let i = 0; i < array.prop.length; i++) {
    const storedEntry = getStorageEntry(array.key[i]);
    const objectKeys = Object.keys(storedEntry);
    for (let x = 0; x < objectKeys.length ; x++) {
      array.prop[i][objectKeys[x]] = storedEntry[objectKeys[x]];
    }
  }
}

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
}

window.onload = load;
