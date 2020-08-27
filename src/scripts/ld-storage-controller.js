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

const ver = "build-0.9.2";

// Default Game Settings & Variables
const gameDefaults = {
  playerCharacter: {
    radius: 15,
    color: '#fff'
  },
  letter: {
    font: '20px Courier',
    color: '#000',
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
  scores: {
    1: {
      name: null,
      level: null,
      score: null,
      achieved: null
    },
    2: {
      name: null,
      level: null,
      score: null,
      achieved: null
    },
    3: {
      name: null,
      level: null,
      score: null,
      achieved: null
    },
    4: {
      name: null,
      level: null,
      score: null,
      achieved: null
    },
    5: {
      name: null,
      level: null,
      score: null,
      achieved: null
    },
    6: {
      name: null,
      level: null,
      score: null,
      achieved: null
    },
    7: {
      name: null,
      level: null,
      score: null,
      achieved: null
    },
    8: {
      name: null,
      level: null,
      score: null,
      achieved: null
    },
    9: {
      name: null,
      level: null,
      score: null,
      achieved: null
    },
    10: {
      name: null,
      level: null,
      score: null,
      achieved: null
    }
  },
  initialised: "build-0.9.2",
};

// Customisable Settings & Variables
const playerCharacter = {
  radius: undefined,
  color: undefined
};
const letter = {
  font: undefined,
  color: undefined,
  size: undefined,
  chance: undefined,
  maxSpeed: undefined,
  minSpeed: undefined
};
const tracker = {
  font: undefined,
  color: undefined,
  x: undefined,
  y: undefined
};
const particleProperties = {
  shrink: undefined,
  maxAlpha: undefined,
  maxRadius: undefined,
  maxSpeedX: undefined,
  maxSpeedY: undefined,
  minAlpha: undefined,
  minRadius: undefined,
  minSpeedX: undefined,
  minSpeedY: undefined,
  total: undefined
};

// Storage Functions
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

// Score Functions
const checkScore = async (score) => {
  const highScores = await getStorageEntry('scores');
  for (let i = 1; i < 11; i++) {
    if (highScores[i].score === null){
      return [true, i];
    } else if (score > highScores[i].score) {
      return [true, i];
    }
  }
  return [false, 0];
}

const insertScore = async (place, name, score, level) => {
  const highScores = await getStorageEntry('scores');
  const date = new Date();
  const dateAchieved = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  if (highScores[place].score === null){
    highScores[place].name = name;
    highScores[place].score = score;
    highScores[place].level = level;
    highScores[place].achieved = dateAchieved;
  } else if (highScores[place].score !== null) {
    for (let i = 10; i >= place; i--) {
      if (i === place) {
        highScores[place].name = name;
        highScores[place].score = score;
        highScores[place].level = level;
        highScores[place].achieved = dateAchieved;
      } else {
        highScores[i].name = highScores[i-1].name;
        highScores[i].score = highScores[i-1].score;
        highScores[i].level = highScores[i-1].level;
        highScores[i].achieved = highScores[i-1].achieved;
      }
    }
  }

  await createStorageEntry('scores', highScores)
}

// Initialisation Functions
const checkInitialised = () => {
  const initialised = ldStorage.getItem('initialised');
  const answer = initialised === ver ? true : false;
  return answer;
}

// Settings Functions
const setSettings = (array) => {
  for (let i = 0; i < array.prop.length; i++) {
    const storedEntry = getStorageEntry(array.key[i]);
    const objectKeys = Object.keys(storedEntry);
    for (let x = 0; x < objectKeys.length ; x++) {
      array.prop[i][objectKeys[x]] = storedEntry[objectKeys[x]];
    }
  }
}
