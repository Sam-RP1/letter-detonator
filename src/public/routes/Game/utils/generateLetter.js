import generateRandomFloat from "./generateRandomFloat";
import generateRandomInteger from "./generateRandomInteger";

/**
 * generateLetter() -
 * Generates a letter's properties for animation on a canvas.
 *
 * This function calculates the starting position and velocity for a letter to animate
 * from the edge of the canvas towards the center. It randomly selects a letter from the
 * alphabet and calculates its movement based on a random speed determined by a given
 * time range.
 *
 * @param {number} minTime - The minimum time (in milliseconds) it should take for the letter to reach the center.
 * @param {number} maxTime - The maximum time (in milliseconds) it should take for the letter to reach the center.
 * @param {number} canvasHeight - The height of the canvas where the letter will be animated.
 * @param {number} canvasWidth - The width of the canvas where the letter will be animated.
 * @returns {Object} An object containing the letter's properties including speed, start position, current position, start time, total time to travel, and the letter itself.
 */
const generateLetter = (minTime, maxTime, canvasHeight, canvasWidth) => {
  // Calculate the center of the canvas
  const cX = canvasWidth / 2;
  const cY = canvasHeight / 2;

  // Determine the side of the canvas from which the letter will enter: 0 for left, canvasWidth for right
  const edgeSide = Math.random() < 0.5 ? 0 : canvasWidth;
  // Randomly generate the entry height within the canvas bounds
  const entryHeight = generateRandomFloat(0, canvasHeight);

  // Calculate direction vectors towards the center of the canvas
  const directionX = cX - edgeSide;
  const directionY = cY - entryHeight;

  // Calculate the distance to the center of the canvas
  const distance = Math.hypot(directionX, directionY);

  // Determine the time it should take for the letter to reach the center
  const time = generateRandomFloat(minTime, maxTime);

  // Calculate the speed based on distance and time
  const speed = distance / time;

  // Select a random letter from the alphabet
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = generateRandomInteger(0, alphabet.length - 1);
  const randomLetter = alphabet[randomIndex];

  // Record the start time of the animation
  const startTime = Date.now();

  // Return the calculated properties for the letter
  return {
    speedX: (directionX / distance) * speed, // Horizontal speed component
    speedY: (directionY / distance) * speed, // Vertical speed component
    startX: edgeSide, // Starting X position
    startY: entryHeight, // Starting Y position
    x: edgeSide, // Current X position (initially same as startX)
    y: entryHeight, // Current Y position (initially same as startY)
    startTime: startTime, // Animation start time
    time: time, // Total time to travel
    code: randomLetter, // The letter to animate
  };
};

export default generateLetter;
