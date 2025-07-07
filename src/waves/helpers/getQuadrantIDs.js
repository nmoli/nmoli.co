const getQuadrantIDs = (i, j, n) => {
  const quadrants = [];
  for (let k = i - Math.floor(n / 2); k <= i + Math.floor(n / 2); k++) {
    for (let l = j - Math.floor(n / 2); l <= j + Math.floor(n / 2); l++) {
      quadrants.push(`${k}-${l}`);
    }
  }
  return quadrants;
};

export default getQuadrantIDs;
