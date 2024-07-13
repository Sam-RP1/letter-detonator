import generateRandomInteger from "./generateRandomInteger.js";

/**
 * generateExplosion() -
 * Generates explosion data based on the position of a letter and explosion size range.
 *
 * This function creates an explosion effect by calculating its position, size, and initial animation stage
 * based on the provided parameters. The explosion's position is offset from the letter's position to ensure
 * it appears centered around the letter. The size of the explosion is randomly determined within the specified
 * range. The function also records the start time of the explosion to manage the animation sequence.
 *
 * @param {number} letterX - The X coordinate of the letter where the explosion originates.
 * @param {number} letterY - The Y coordinate of the letter where the explosion originates.
 * @param {number} explosionMinSize - The minimum size of the explosion.
 * @param {number} explosionMaxSize - The maximum size of the explosion.
 * @param {number} explosionStartingSprite - The starting sprite index for the explosion animation.
 * @returns {Object} The explosion data including position, size, stage (starting sprite index), and start time.
 */
const generateExplosion = (
  letterX,
  letterY,
  explosionMinSize,
  explosionMaxSize,
  explosionStartingSprite
) => {
  // Calculate the size of the explosion within the specified range
  const explosionSize = generateRandomInteger(
    explosionMinSize,
    explosionMaxSize
  );

  // Define offset factors to position the explosion's center relative to the letter's position
  const X_OFFSET_FACTOR = 4;
  const Y_OFFSET_FACTOR = 1.5;

  // Return the explosion data, including calculated position, size, initial animation stage, and start time
  return {
    x: letterX - explosionSize / X_OFFSET_FACTOR, // Adjust X position to center the explosion
    y: letterY - explosionSize / Y_OFFSET_FACTOR, // Adjust Y position to center the explosion
    size: explosionSize, // Set the explosion size
    stage: explosionStartingSprite, // Set the initial animation stage
    startTime: Date.now(), // Record the start time for animation purposes
  };
};

export default generateExplosion;
