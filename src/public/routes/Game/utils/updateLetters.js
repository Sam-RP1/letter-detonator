/**
 * updateLetters() - (src/public/routes/Game/utils/updateLetters.js)
 * Updates the position of each letter in the array based on the time elapsed since the start.
 *
 * This function iterates over an array of letter objects, calculating the new position for each letter
 * based on the time elapsed since the letter's start time. The position is updated only if the elapsed
 * time is within the letter's designated time frame (100% of the travel time).
 *
 * @param {Object[]} lettersArr - An array of letter objects. Each letter object must have:
 *   @param {number} letter.startTime - The start time in milliseconds when the letter's movement began.
 *   @param {number} letter.time - The total time in milliseconds the letter is supposed to move.
 *   @param {number} letter.startX - The starting X position of the letter.
 *   @param {number} letter.startY - The starting Y position of the letter.
 *   @param {number} letter.speedX - The speed of the letter along the X-axis, in units per millisecond.
 *   @param {number} letter.speedY - The speed of the letter along the Y-axis, in units per millisecond.
 *
 * Each letter's new position is calculated using the formula:
 * newPosition = startPosition + (elapsedTime * speed)
 * where elapsedTime is the time elapsed since the letter's movement started.
 *
 * Note: This function mutates the original lettersArr.
 */
const updateLetters = (lettersArr) => {
  const currentTime = Date.now(); // Current time in milliseconds

  lettersArr.forEach((letter) => {
    const timeElapsed = currentTime - letter.startTime; // Calculate elapsed time for each letter
    const percentageElapsed = (timeElapsed / letter.time) * 100; // Calculate the percentage of the total time elapsed

    // Update letter's position if the elapsed time is within 100% of the designated time frame
    if (percentageElapsed <= 100.0) {
      letter.x = letter.startX + timeElapsed * letter.speedX; // Update X position based on elapsed time and speed
      letter.y = letter.startY + timeElapsed * letter.speedY; // Update Y position similarly
    }
    // If the elapsed time exceeds 100%, the letter's position is not updated, assuming it has reached its destination
  });
};

export default updateLetters;
