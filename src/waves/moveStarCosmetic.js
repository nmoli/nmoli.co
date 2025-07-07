const getNewDirectionVector = () => {
  const randomDirection = Math.random() * 2 * Math.PI;
  return {
    x: Math.cos(randomDirection),
    y: Math.sin(randomDirection),
  };
};

export const moveStarCosmetic = (star, t, nextStar, isShiftFrame) => {
  let didChange = false;
  if (!star.directionVector) {
    star.directionVector = getNewDirectionVector();
  } else {
    // Only change direction if landing 1/4 odds
    if (Math.random() < 0.01) {
      star.directionVector = getNewDirectionVector();
      didChange = true;
    }
  }

  let newX = star.xPlusCosmetic + star.directionVector.x / 8;
  let newY = star.yPlusCosmetic + star.directionVector.y / 8;

  if (nextStar && isShiftFrame) {
    // const nattyDeltaX = star.ogX - nextStar.ogX;
    // const nattyDeltaY = star.ogY - nextStar.ogY;
    // newX = nextStar.x + nattyDeltaX + Math.random() - 0.5;
    // newY = nextStar.y + nattyDeltaY + Math.random() - 0.5;

    const nattyDeltaX = star.ogX - nextStar.ogX;
    const nattyDeltaY = star.ogY - nextStar.ogY;

    if (!didChange) {
      star.directionVector = nextStar.directionVector;
    }
    newX = nextStar.xPlusCosmetic + star.directionVector.x / 8;
    newY = nextStar.yPlusCosmetic + star.directionVector.x / 8;
  }

  const dist = Math.sqrt(newX ** 2 + newY ** 2);

  const maxDist = 5;

  if (dist > maxDist) {
    const overage = dist - maxDist;
    const slopeX = newX / dist;
    const slopeY = newY / dist;
    newX = slopeX * (maxDist - overage);
    newY = slopeY * (maxDist - overage);
    // Invert the direction vector
    star.directionVector.x = -star.directionVector.x;
    star.directionVector.y = -star.directionVector.y;
  }

  return {
    xPlusCosmetic: newX,
    yPlusCosmetic: newY,
  };
};
