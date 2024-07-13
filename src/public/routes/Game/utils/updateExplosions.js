/**
 * updateExplosions(explosionsArr, explosionVars) -
 * Updates the stage of each explosion in the array based on the elapsed time since they started.
 * Removes the explosion from the array once it has completed all its stages.
 */
const updateExplosions = (explosionsArr, explosionVars) => {
  const durationPerExplosionStage = 1000 / 11;

  for (let i = explosionsArr.length - 1; i >= 0; i--) {
    const explosion = explosionsArr[i];

    const elapsedTime = Date.now() - explosion.startTime;
    let currentStage = Math.floor(elapsedTime / durationPerExplosionStage);

    // If the explosion has completed all stages, remove it from the array
    if (currentStage >= explosionVars.sprites.length) {
      explosionsArr.splice(i, 1);
    } else {
      explosion.stage = explosionVars.sprites[currentStage];
    }
  }
};

export default updateExplosions;
