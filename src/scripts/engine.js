//------------- GLOBAL VARIABLES -------------//
const c = document.getElementById('canvas'); // Get canvas & canvas context
const ctx = c.getContext('2d');
c.height = window.innerHeight; // Set canvas height & width
c.width = window.innerWidth;
const meter = new FPSMeter({ graph: 1, top: 'auto', bottom: '5px' }); // Set up FPS Meter
const FRAME_TIME_MAX = 250; // Frame time variables
const FRAME_TIME = 1000 / 58;
const getCurrentTime = typeof performance === 'function' ? performance.now : Date.now;  // Engine variables
let animation;
let engineLoop;
let previous = getCurrentTime();
let accumulator = 0;

//------------- GAME ENGINE LOOPER -------------//
const loop = engineLogic => {
  const current = getCurrentTime();
  let frameTime = current - previous;
  previous = current;
  let frames = 0;
  // Keeps animation consistent
  if (frameTime < FRAME_TIME_MAX) {
    accumulator += frameTime;
    while (accumulator >= FRAME_TIME) { // If accumulation becomes < FRAME_TIME then break
      frames++;
      accumulator -= FRAME_TIME;
    }
  }
  ctx.clearRect(0, 0, c.width, c.height);
  meter.tick();
  if (end !== true) {
    engineLogic(frames);
    if (engineLoop === undefined) {
      engineLoop = () => {
        loop(engineLogic);
      };
    }
    animation = window.requestAnimationFrame(engineLoop);
  } else {
    gameOver();
  }
};
