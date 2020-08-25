//------------- GLOBAL VARIABLES -------------//
const center = {
  x: c.width / 2,
  y: c.height / 2
};
const playerCharacter = {
  radius: 15,
  color: '#000'
};
const letter = {
  font: '20px Courier',
  color: '#0080b3',
  size: 30,
  chance: 0.01,
  maxSpeed: 1.5,
  minSpeed: 0.5
};
const tracker = {
  font: '24px Arial',
  color: '#0080b3',
  x: 15,
  y: 30,
  right: c.width - 100
};
const levels = [
  {
    id: '1',
    class: 'level-one',
    textColor: '#',
  },
  {
    id: '2',
    class: 'level-two',
    textColor: '#',
  },
  {
    id: '3',
    class: 'level-three',
    textColor: '#',
  },
  {
    id: '4',
    class: 'level-four',
    textColor: '#',
  },
  {
    id: '5',
    class: 'level-five',
    textColor: '#',
  }
];
const particleProperties = {
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
};
const explosionColors = [['226', '40', '34'], ['226', '56', '34'], ['226', '72', '34'], ['226', '88', '34'], ['226', '104', '34'], ['226', '120', '34']];
const particles = [];
let letters = [];
let score = 0;
let highScore = 0;
let page = document.getElementById('root');

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
*/
const levelHandler = () => {
  if (score > 10) {
    page.classList.add(levels[0].class);
  } else if (score > 30) {
    page.classList.add(levels[1].class);
    page.classList.remove(levels[0].class);
  } else if (score > 50) {
    page.classList.add(levels[2].class);
    page.classList.remove(levels[1].class);
    page.classList.remove(levels[0].class);
  } else if (score > 70) {
    page.classList.add(levels[3].class);
    page.classList.remove(levels[2].class);
    page.classList.remove(levels[1].class);
    page.classList.remove(levels[0].class);
  } else if (score > 100) {
    page.classList.add(levels[4].class);
    page.classList.remove(levels[3].class);
    page.classList.remove(levels[2].class);
    page.classList.remove(levels[1].class);
    page.classList.remove(levels[0].class);
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
  if (Math.random() < letter.chance) {
    const x = Math.random() < 0.5 ? 0 : c.width; // enter via left edge or right edge
    const y = Math.random() * c.height; // entry height on edge
    const directionX = center.x - x;
    const directionY = center.y - y;
    const mult = Math.sqrt(directionX ** 2 + directionY ** 2);
    const speed = generateRandomNum(letter.minSpeed, letter.maxSpeed);
    const letterCode = Math.random() < 0.5 ? generateRandomInt(25) + 65 : generateRandomInt(25) + 97
    // UTF-16: upper case letters between 65 & 90, lower case letters between 97 & 122
    letters.push({
      x,
      y,
      code: letterCode,
      speedX: directionX / mult * speed,
      speedY: directionY / mult * speed
    });
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
      window.alert('Game Over!');
      score = 0;
      letters = [];
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
  if (e.keyCode === 27) {
    if (animation === undefined) {
      animation = window.requestAnimationFrame(engineLoop);
    } else {
      window.cancelAnimationFrame(animation);
      animation = undefined;
    }
  }
};

//------------- LOOP -------------//
loop(function (frames) {
  // Player character
  paintCircle(center.x, center.y, playerCharacter.radius, playerCharacter.color);
  // Paint Letters
  ctx.font = letter.font;
  ctx.fillStyle = letter.color;
  for (const item of letters) {
    ctx.fillText(String.fromCharCode(item.code), item.x, item.y);
  }
  // Score Tracker
  ctx.font = tracker.font;
  ctx.fillStyle = tracker.color;
  ctx.fillText('Score: ' + score, tracker.x, tracker.y);
  //
  paintExplosion();
  handleExplosion(frames);
  generateLetters();
  destroyLetters(frames);
  levelHandler();
});

//------------- EVENTLISTENERS & EXTRAS -------------//
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
