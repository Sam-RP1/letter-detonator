//------------- GLOBAL VARIABLES -------------//
const center = {
  x: c.width / 2,
  y: c.height / 2
};
const reset = {
  class: 'default-bg',
  textColor: '#000',
  chance: 0.01
}
const tracker = {
  font: '24px Arial',
  color: '#0080b3',
  x: 15,
  y: 30
}
const particleProperties = {
  shrink: 0.1,
  maxAlpha: 0.8,
  maxRadius: 5,
  maxSpeedX: 2,
  maxSpeedY: 2,
  minAlpha: 0.3,
  minRadius: 1,
  minSpeedX: -2,
  minSpeedY: -2,
  total: 100
}
const explosionColors = [['226', '40', '34'], ['226', '56', '34'], ['226', '72', '34'], ['226', '88', '34'], ['226', '104', '34'], ['226', '120', '34'], ['255', '255', '130']];
const particles = [];
let letters = [];
let maxLetterCount = 15;
let score = 0;
let level = 1;
let end = false;
let page = document.getElementById('root');
let characters = [document.getElementById("Dude_Monster"), document.getElementById("Owlet_Monster"), document.getElementById("Pink_Monster")];

/**
* generateRandomNum(min, max) -
* Generates a random number.
* @param {float} min The circles x coordinate
* @param {float} max The circles y coordinate
* @return {float} returns a random float
*/
const generateRandomNum = (min, max) => min + (Math.random() * (max - min));

/**
* generateRandomInt(max) -
* Generates a random integer.
* @param {int} max The max the random integer can be
* @return {int} returns a random integer less then or equal to the max parameter
*/
const generateRandomInt = (max) => Math.floor(Math.random() * max);

/**
* isIntersectingPlayer(entity1, hxw1, entity2, hxw2) -
* Checks if a letter (square in shape and dimensions) is intersecting (touching, overlapping, colliding) with the players circle.
* @param {JSON} entity1 The letter object
* @param {int} hxw1 The height and width of letters
* @param {JSON} entity2 The canvas center object
* @param {int} hxw2 The player characters height and width
* @return {bool} returns either true for intersecting or false for no intersecting
*/
const isIntersectingPlayer = (entity1, hxw1, entity2, hxw2) => (entity2.x < entity1.x + hxw1) && (entity2.x + hxw2 > entity1.x) && (entity2.y < entity1.y + hxw1) && (entity2.y + hxw2 > entity1.y);

/**
* paintCircle(x, y, radius, color) -
* Draws circles on to the canvas.
* @param {float} x The circles x coordinate
* @param {float} y The circles y coordinate
* @param {int} radius The circles radius
* @param {hex} color The circles color
*/
const paintCircle = (x, y, radius, color) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

//------------- LEVEL FUNCTIONS -------------//
/**
* levelHandler() -
* Handles the changing of levels by setting numerous variables that alter the gameplay.
* Make more efficient?
*/
const levelHandler = () => {
  const bg = document.getElementById('root');
  if (score > 250) {
    level = 11;
    letter.chance = 0.125;
    maxLetterCount = 100;
    bg.className = 'level-eleven';
  } else if (score > 200) {
    level = 10;
    letter.chance = 0.1;
    maxLetterCount = 80;
    bg.className = 'level-ten';
  } else if (score > 175) {
    level = 9;
    letter.chance = 0.06;
    maxLetterCount = 70;
    bg.className = 'level-nine';
  } else if (score > 150) {
    level = 8;
    letter.chance = 0.055;
    maxLetterCount = 60;
    bg.className = 'level-eight';
  } else if (score > 125) {
    level = 7;
    letter.chance = 0.05;
    maxLetterCount = 50;
    bg.className = 'level-seven';
  } else if (score > 100) {
    level = 6;
    letter.color = '#fff';
    letter.chance = 0.04;
    maxLetterCount = 45;
    bg.className = 'level-six';
  } else if (score > 75) {
    level = 5;
    letter.chance = 0.03;
    maxLetterCount = 40;
    bg.className = 'level-five';
  } else if (score > 50) {
    level = 4;
    letter.chance = 0.025;
    maxLetterCount = 35;
    bg.className = 'level-four';
  } else if (score > 30) {
    level = 3;
    letter.chance = 0.02;
    maxLetterCount = 30;
    bg.className = 'level-three';
  } else if (score > 15) {
    level = 2;
    letter.chance = 0.015;
    maxLetterCount = 25;
    bg.className = 'level-two';
  } else if (score <= 15) {
    level = 1;
    letter.chance = 0.01;
    maxLetterCount = 20;
    bg.className = 'level-one';
    letter.color = '#000';
  }
};

//------------- PARTICLES & EXPLOSIONS -------------//
/**
* createParticles(i, letter) -
* Creates particles for the x & y coordinates provided. Pushes partciles for explosions into the particles array.
* @param {float} x The x coordinate
* @param {float} y The y coordinate
*/
const createParticles = (x, y) => {
  for (let i = 0; i < particleProperties.total; i++) {
    const colors = explosionColors[Math.floor(Math.random() * explosionColors.length)];
    const alpha = generateRandomNum(particleProperties.minAlpha, particleProperties.maxAlpha);
    particles.push({
      x,
      y,
      radius: generateRandomNum(particleProperties.minRadius, particleProperties.maxRadius),
      color: `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, ${alpha})`,
      speedX: generateRandomNum(particleProperties.minSpeedX, particleProperties.maxSpeedX),
      speedY: generateRandomNum(particleProperties.minSpeedY, particleProperties.maxSpeedY)
    });
  }
};

/**
* paintExplosion() -
* Draws explosions for letters on to the canvas using the particles array.
*/
const paintExplosion = () => {
  for (const item of particles) {
    paintCircle(item.x, item.y, item.radius, item.color);
  }
};

/**
* handleExplosion(frame) -
* Handles the particles.
*/
const handleExplosion = frames => {
  let i = 0;
  for (const particle of particles) {
    const particle = particles[i];
    particle.x += particle.speedX * frames;
    particle.y += particle.speedY * frames;
    particle.radius -= particleProperties.shrink;
    if (particle.radius <= 0 || particle.x < 0 || particle.x > c.width || particle.y < 0 || particle.y > c.height) {
      particles.splice(i, 1);
    }
    i++;
  }
};

//------------- LETTER FUNCTIONS -------------//
/**
* generateLetters() -
* Creates a letters properties which are then pushed in to the letters array.
*/
const generateLetters = () => {
  if (letters.length < maxLetterCount) {
    if (Math.random() < letter.chance) {
      const x = Math.random() < 0.5 ? 0 : c.width; // enter via left edge or right edge
      const y = Math.random() * c.height; // entry height on edge
      const directionX = center.x - x;
      const directionY = center.y - y;
      const mult = Math.sqrt(directionX ** 2 + directionY ** 2);
      const speed = generateRandomNum(letter.minSpeed, letter.maxSpeed);
      const letterCode = Math.random() < 0.00 ? generateRandomInt(25) + 65 : generateRandomInt(25) + 97
      // UTF-16: lower case letters between 65 & 90, upper case letters between 97 & 122
      letters.push({
        x,
        y,
        code: letterCode,
        speedX: directionX / mult * speed,
        speedY: directionY / mult * speed
      });
    }
  }
};

/**
* removeLetter(i, letter) -
* Removes letter from letters array at index i. Score incremented, explosion created.
* @param {int} i The letters index in the letters array
* @param {JSON} letter Object for the letter to be removed
*/
const removeLetter = (i, letter) => {
  letters.splice(i, 1);
  score++;
  createParticles(letter.x, letter.y);
};

/**
* destroyLetters(frames) -
* Each letter in the letters array is checked for intersection with the player character.
* If a letter is intersecting with the player character then the game is ended, score reset to 0 and letters array reset.
* Else game continues.
*/
const destroyLetters = (frames) => {
  for (const item of letters) {
    if (isIntersectingPlayer(item, letter.size, center, playerCharacter.radius)) {
      end = true;
    } else {
      item.x += item.speedX * frames;
      item.y += item.speedY * frames;
    }
  }
};

//------------- KEY HANDLERS -------------//
const keyDownHandler = (e) => {
  if (animation !== undefined && e.keyCode >= 65 && e.keyCode <= 90) { // Disable key input when animation is not defined
    let i = 0;
    for (const letter of letters) {
      if (e.shiftKey) {
        if (e.keyCode === letter.code) {
          removeLetter(i, letter);
          return;
        }
      } else {
        if (e.keyCode + 32 === letter.code) {
          removeLetter(i, letter);
          return;
        }
      }
      i++;
    }
    score--; // If letter entered is not in letters array then deduct 1 point from score
  }
};

const keyUpHandler = (e) => {
  const modal = document.getElementById('modal-container');
  const pauseMenu = document.getElementById('pause-menu');
  if (e.keyCode === 27) {
    if (animation === undefined && pauseMenu.style.display === 'flex') {
      console.log("UNPAUSING GAME")
      continueGame();
    } else if (modal.classList.contains('active')) {
      console.log("MENU OPEN: escape disabled")
    } else {
      openPauseMenu();
    }
  }
};

//------------- LOOP -------------//
const letterdetonator = function (frames) {
  // Player character
  ctx.drawImage(characters[playerCharacter.id], (c.width - 36) / 2, (c.height - 36) / 2, 36, 36)
  // Paint Letters
  ctx.font = letter.font;
  ctx.fillStyle = letter.color;
  for (const item of letters) {
    ctx.fillText(String.fromCharCode(item.code), item.x, item.y);
  }
  // Trackers
  ctx.font = tracker.font;
  ctx.fillStyle = letter.color;
  ctx.fillText('Level: ' + level, tracker.x, tracker.y);
  ctx.fillText('Score: ' + score, tracker.x + 150, tracker.y);
  //
  paintExplosion();
  handleExplosion(frames);
  generateLetters();
  destroyLetters(frames);
  levelHandler();
}

//------------- EVENTLISTENERS & EXTRAS -------------//
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
