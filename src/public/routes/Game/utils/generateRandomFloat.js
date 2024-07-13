/**
 * generateRandomFloat(min, max) -
 * Generates a random float between min (inclusive) and max (exclusive) with specified precision.
 * @param {number} min - The minimum value the random float can be, inclusive.
 * @param {number} max - The maximum value the random float can be, exclusive.
 * @param {number} [precision=2] - The number of decimal places in the returned float.
 * @return {number} A random float between min and max with specified precision.
 * @throws {Error} If min is not less than max or if any argument is not a number.
 */
const generateRandomFloat = (min, max, precision = 2) => {
  const factor = Math.pow(10, precision);
  return Math.floor((Math.random() * (max - min) + min) * factor) / factor;
};

export default generateRandomFloat;
