const modal = document.getElementById('modal-container');

const startGame = () => {
  console.log("START");
  modal.style.display = 'none';
  loop(letterdetonator);
}

const openHighscores = () => {
  console.log("OPEN HIGHSCORES");
  clearMenu();
  document.getElementById('high-score-menu').style.display = 'flex';
}

const openHowToPlay = () => {
  console.log("OPEN HOW TO PLAY");
}

const openControls = () => {
  console.log("OPEN CONTROLS");
}

const openSettings = () => {
  console.log("OPEN SETTINGS");
}

const openPauseMenu = () => {
  clearMenu();
  document.getElementById('pause-menu').style.display = 'flex';
  console.log("OPEN PAUSE MENU");
  window.cancelAnimationFrame(animation);
  animation = undefined;
  modal.style.display = 'flex';
}

const continueGame = () => {
  console.log("CONTINUE GAME");
  modal.style.display = 'none';
  animation = window.requestAnimationFrame(engineLoop);
}

const restartGame = () => {
  console.log("RESTART GAME");
}

const quitGame = () => {
  console.log("QUIT GAME");
  clearMenu();
  const homeMenu = document.getElementById('home-menu');
  score = 0;
  letters = [];
  ctx.clearRect(0, 0, c.width, c.height);
  homeMenu.style.display = 'flex';
}

const gameOver = () => {
  clearMenu();
  document.getElementById('game-over-menu').style.display = 'flex';
  console.log("GAME OVER");
  window.cancelAnimationFrame(animation);
  animation = undefined;
  score = 0;
  letters = [];
  ctx.clearRect(0, 0, c.width, c.height);
  end = false;
  modal.style.display = 'flex';
}

const openHome = () => {
  console.log("RETURN TO HOME MENU");
  clearMenu();
  homeMenu = document.getElementById('home-menu').style.display = 'flex';
}

const clearMenu = () => {
  document.getElementById('home-menu').style.display = 'none';
  document.getElementById('high-score-menu').style.display = 'none';
  document.getElementById('pause-menu').style.display = 'none';
  document.getElementById('game-over-menu').style.display = 'none';
}
