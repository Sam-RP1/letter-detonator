const toggleModal = () => {
  const modal = document.getElementById('modal-container');
  modal.classList.toggle('active');
}

const clearMenu = () => {
  const menu = document.getElementById('menu-modal');
  for (const child of menu.childNodes) {
    child.style.display = 'none';
  }
}

const startGame = () => {
  console.log("START");
  toggleModal();
  clearMenu();
  loop(letterdetonator);
}

const openHighscores = () => {
  console.log("OPEN HIGHSCORES");
  clearMenu();
  document.getElementById('high-scores-menu').style.display = 'flex';
}

const openHowToPlay = () => {
  console.log("OPEN HOW TO PLAY");
  clearMenu();
  document.getElementById('htp-menu').style.display = 'flex';
}

const openControls = () => {
  console.log("OPEN CONTROLS");
  clearMenu();
  document.getElementById('controls-menu').style.display = 'flex';
}

const openSettings = () => {
  console.log("OPEN SETTINGS");
  clearMenu();
  document.getElementById('settings-menu').style.display = 'flex';
}

const openMainMenu = () => {
  console.log("RETURN TO MAIN MENU");
  clearMenu();
  document.getElementById('main-menu').style.display = 'flex';
}

// Pause & in-play menus
const openPauseMenu = () => {
  console.log("OPEN PAUSE MENU");
  window.cancelAnimationFrame(animation);
  animation = undefined;
  clearMenu();
  document.getElementById('pause-menu').style.display = 'flex';
  toggleModal();
}

const continueGame = () => {
  console.log("CONTINUE GAME");
  toggleModal();
  animation = window.requestAnimationFrame(engineLoop);
}

const restartGame = () => {
  console.log("RESTART GAME");
  score = 0;
  level = 1;
  letters = [];
  ctx.clearRect(0, 0, c.width, c.height);
  toggleModal();
  loop(letterdetonator);
}

const quitGame = () => {
  console.log("QUIT GAME");
  score = 0;
  level = 1;
  letters = [];
  document.getElementById('root').className = reset.class;
  ctx.clearRect(0, 0, c.width, c.height);
  clearMenu();
  document.getElementById('main-menu').style.display = 'flex';
}

const gameOver = async () => {
  console.log("GAME OVER");
  window.cancelAnimationFrame(animation);
  animation = undefined;
  document.getElementById('root').className = reset.class;
  ctx.clearRect(0, 0, c.width, c.height);
  clearMenu();
  document.getElementById('game-over-menu').style.display = 'flex';
  toggleModal();
}
