/**
 * generateRandomInteger(max) -
 * Generates a random integer.
 * @param {int} min The min the random integer can be
 * @param {int} max The max the random integer can be
 * @return {int} returns a random integer
 */
const generateRandomInteger = (min, max) => {
  min = Math.ceil(min); // Ensure the min is rounded up to the nearest whole number
  max = Math.floor(max); // Ensure the max is rounded down to the nearest whole number
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};

export default generateRandomInteger;
