/**
 * removeLetter(i, letter) -
 * Removes letter from letters array at index i. Explosion created.
 * @param {int} i The letters index in the letters array
 * @param {JSON} letter Object for the letter to be removed
 */
const removeLetter = (letters, i) => {
  letters.splice(i, 1);
};

export default removeLetter;
