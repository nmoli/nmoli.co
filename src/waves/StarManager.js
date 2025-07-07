import getQuadrantIDs from "./helpers/getQuadrantIDs";
import Star from "./Star";

const springConstant = 0.1; // Spring stiffness
const damping = 0.9; // Motion damping
const restLength = 20; // Desired spring length
const influenceRadius = 20; // Number of stars to influence in each direction

let oldStarIDToNewStarMap = {};
let oldStarIDToOldStarMap = {};
let pointsToSpawnIn = [];

class StarManager {
  constructor() {
    this.stars = [];
  }

  addStarsInOrder(points, isConnected = true) {
    let starZero = new Star(points[0].x, points[0].y);
    let prevStar = starZero;

    if (isConnected == 2 && this.stars.length) {
      starZero.inStars.push(this.stars[this.stars.length - 1]);
      this.stars[this.stars.length - 1].outStars.push(starZero);
      isConnected = false;
    }

    this.stars.push(starZero);

    for (let i = 1; i < points.length; i++) {
      const star = new Star(points[i].x, points[i].y);
      prevStar.outStars.push(star);
      star.inStars.push(prevStar);
      prevStar = star;
      this.stars.push(star);
    }

    if (isConnected) {
      prevStar.outStars.push(starZero);
      starZero.inStars.push(prevStar);
    }

    // console.log(this.stars);
  }

  setStars(stars) {
    this.stars = stars;
  }

  shitpost() {
    this.stars
      // .filter((star) => !star.hasSwitched)
      .forEach((star, i) => {
        const isIkanDeshout = star.moveTowardsGoal(
          oldStarIDToNewStarMap,
          oldStarIDToOldStarMap
        );

        if (!star.wouldLikeToBeStar) {
          if (star.inStars[0]) {
            star.inStars[0].outStars = [star.inStars[0]];
          }
          if (star.outStars[0]) {
            star.outStars[0].inStars = [star.outStars[0]];
          }
          this.stars.splice(i, 1);
        }
      });

    if (this.stars.every((x) => x.hasSwitched)) {
      // console.log("Im posting");
    }
  }

  // TODO: This is actually cacheable- so in theory we dont need to make the user wait for this, just generate it in advance
  matchCurrentStarsToNextStars(nextStars) {
    // Shallow copy of stars
    let starsLinear = this.stars.map((star) => star);
    let nextStarsLinear = nextStars;

    oldStarIDToNewStarMap = {};
    oldStarIDToOldStarMap = {};
    pointsToSpawnIn = [];

    let acceptableDist = 0;

    let QuadrantsMap1 = {};
    let QuadrantsMap2 = {};

    const canvasHeight = 360; //TODO: Update this to be dynamic
    const canvasWidth = 560;
    const numHQuadrants = 36;
    const numWQuadrants = 28;
    const quadrantHeight = Math.floor(canvasHeight / numHQuadrants);
    const quadrantWidth = Math.floor(canvasWidth / numWQuadrants);

    // Assemble quadrant maps
    for (let i = 0; i < numHQuadrants; i++) {
      for (let j = 0; j < numWQuadrants; j++) {
        QuadrantsMap1[`${i}-${j}`] = [];
        QuadrantsMap2[`${i}-${j}`] = [];
        // console.log(`${i}-${j}`);
      }
    }

    for (let star of starsLinear) {
      const x = Math.floor(star.x / quadrantWidth);
      const y = Math.floor(star.y / quadrantHeight);
      try {
        QuadrantsMap1[`${x}-${y}`].push(star);
      } catch (e) {
        // throw e;
      }
      star.quadrant = {
        x,
        y,
      };
    }

    for (let star of nextStarsLinear) {
      const x = Math.floor(star.x / quadrantWidth);
      const y = Math.floor(star.y / quadrantHeight);
      try {
        QuadrantsMap2[`${x}-${y}`].push(star);
      } catch (e) {
        // nextStarsLinear.splice(nextStarsLinear.indexOf(star), 1);
        throw e;
      }
      star.quadrant = {
        x,
        y,
      };
    }

    let starIndex = 0;
    let acceptableAutoMatchDistance = 0;
    let smallestDogCoords = {};

    while (starsLinear.length > 0 && nextStarsLinear.length > 0) {
      const star = starsLinear[starIndex];
      let smallestDistanceEncountered = 1000000;
      let smallestDistanceNextStarIndex = undefined;

      const numQuadrantsReq = Math.floor(
        acceptableAutoMatchDistance / quadrantWidth + 1
      );
      const quadrants = getQuadrantIDs(
        star.quadrant.x,
        star.quadrant.y,
        numQuadrantsReq
      );
      for (let i = 0; i < quadrants.length; i++) {
        const quadrant = quadrants[i];
        if (QuadrantsMap2[quadrant]) {
          for (let j = 0; j < QuadrantsMap2[quadrant].length; j++) {
            const star2 = QuadrantsMap2[quadrant][j];
            const dx = star.x - star2.x;
            const dy = star.y - star2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < smallestDistanceEncountered) {
              smallestDistanceEncountered = dist;
              let foundIndex = 0;
              for (let k = 0; k < nextStarsLinear.length; k++) {
                if (nextStarsLinear[k].starID === star2.starID) {
                  foundIndex = k;
                  break;
                }
              }
              smallestDistanceNextStarIndex = foundIndex;
              smallestDogCoords = {
                quadrant,
                j,
              };
            }
          }
        }
      }
      if (
        smallestDistanceEncountered < acceptableAutoMatchDistance &&
        smallestDistanceEncountered !== 1000000 // TODO: Deosnt really handle this case
      ) {
        if (!nextStarsLinear[smallestDistanceNextStarIndex]) {
          console.log("XD ! TROLL? FUCKER!!");
          console.log(smallestDistanceNextStarIndex);
          console.log(smallestDistanceEncountered);
          console.log(nextStarsLinear);
          console.log(starsLinear);
        }
        star.wouldLikeToBeStar = nextStarsLinear[smallestDistanceNextStarIndex];
        try {
          star.wouldLikeToBeStar.inStars =
            nextStarsLinear[smallestDistanceNextStarIndex].inStars;
        } catch (e) {
          console.log(starsLinear);
          console.log(nextStarsLinear);
          console.log(star.wouldLikeToBeStar);
          console.log(smallestDistanceNextStarIndex);
          console.log(nextStarsLinear[smallestDistanceNextStarIndex]);
          throw e;
        }
        star.wouldLikeToBeStar.outStars =
          nextStarsLinear[smallestDistanceNextStarIndex].outStars;

        oldStarIDToNewStarMap[
          nextStarsLinear[smallestDistanceNextStarIndex].starID
        ] = star;

        oldStarIDToOldStarMap[
          nextStarsLinear[smallestDistanceNextStarIndex].starID
        ] = nextStarsLinear[smallestDistanceNextStarIndex];

        starsLinear.splice(starIndex, 1);
        nextStarsLinear.splice(smallestDistanceNextStarIndex, 1);
        QuadrantsMap2[smallestDogCoords.quadrant].splice(
          smallestDogCoords.j,
          1
        );
      } else {
        starIndex++;
      }
      if (starIndex >= starsLinear.length) {
        starIndex = 0;
        acceptableAutoMatchDistance += quadrantWidth;
      }
    }

    if (nextStarsLinear.length > 0) {
      pointsToSpawnIn = nextStarsLinear;
    }

    return this.stars;

    //   const star = starsLinear[starIndex];
    //   const mostLeastDist = mostmostLeastDist;
    //   const mostLeastStarIndex = undefined;
    //   const getOmgDogMap = (currentL, currentI, currentJ) => {
    //     const dogMaps = [QuadrantsMap2[star.quadrant]];
    //     const quadrantWidth = Math.floor(canvasWidth / numWQuadrants);
    //     const quadrantHeight = Math.floor(canvasHeight / numHQuadrants);
    //     const theSmallerOfTheTwo = Math.min(quadrantHeight, quadrantWidth);
    //     const numExpansionsReq = Math.floor(theSmallerOfTheTwo / currentL);
    //     for (let i = 0; i < numExpansionsReq; i++) {
    //       for (let j = 0; j < numExpansionsReq; j++) {
    //         const newQuadrant = `${currentI + i}-${currentJ + j}`;
    //         if (QuadrantsMap2[newQuadrant]) {
    //           dogMaps.push(QuadrantsMap2[newQuadrant]);
    //         }
    //       }
    //     }
    //   };
    //   const omgDogMap = getOmgDogMap();
    //   for (let j = 0; j < QuadrantsMap2[star.quadrant].length; j++) {
    //     const star2 = QuadrantsMap2[star.quadrant][j];
    //     const dx = star.x - star2.x;
    //     const dy = star.y - star2.y;
    //     const dist = Math.sqrt(dx * dx + dy * dy);
    //     if (dist < mostLeastDist) {
    //       mostLeastDist = dist;
    //       mostLeastStarIndex = j;
    //     }
    //   }
    //   if (mostLeastDist < acceptableDist) {
    //     star.wouldLikeToBeStar = nextStarsLinear[mostLeastStarIndex];
    //     starsLinear.splice(starIndex, 1);
    //     nextStarsLinear.splice(mostLeastStarIndex, 1);
    //   } else {
    //     starIndex++;
    //   }
    //   if (starIndex >= starsLinear.length) {
    //     starIndex = 0;
    //     acceptableDist++;
    //   }
    // }

    // console.log(sortedDistances);
  }

  applyDirectionalPull(
    draggedStar,
    dx,
    dy,
    maxInfluence = 30,
    pullStrength = 1.0
  ) {
    for (let direction of ["inStars", "outStars"]) {
      let current = draggedStar;
      for (let i = 1; i <= maxInfluence; i++) {
        current = current[direction][0];
        if (!current) break;

        // Falloff: cosine curve (smoother than linear)
        // const falloff = Math.cos((i / (maxInfluence + 1)) * Math.PI * 0.5); // 1 → 0
        const falloff = 1 / Math.sqrt(i);

        // Apply a fraction of the drag offset
        current.x += dx * pullStrength * falloff;
        current.y += dy * pullStrength * falloff;
      }
    }
  }

  mouseRepelStars(mouseX, mouseY) {
    for (let star of this.stars) {
      const dx = mouseX - star.x;
      const dy = mouseY - star.y;
      const dOgX = mouseX - star.ogX;
      const dOgY = mouseY - star.ogY;
      const distReal = Math.sqrt(dx * dx + dy * dy);
      const distOg = Math.sqrt(dOgX * dOgX + dOgY * dOgY);

      const mouse_cooties_radius = 25;

      if (distReal < mouse_cooties_radius) {
        const force = (mouse_cooties_radius - distReal) / mouse_cooties_radius;
        // Normalize to [0, 1]
        star.x -= (dx / distReal) * force;
        star.y -= (dy / distReal) * force;

        const distFromOgToReal = Math.sqrt(
          (star.x - star.ogX) * (star.x - star.ogX) +
            (star.y - star.ogY) * (star.y - star.ogY)
        );
        if (distFromOgToReal > mouse_cooties_radius) {
          star.x += (dx / distReal) * force;
          star.y += (dy / distReal) * force;
        } else if (distFromOgToReal < 0.3) {
          star.x -= (dx / distReal) * 0.3;
          star.y -= (dy / distReal) * 0.3;
        }
      } else {
        // Return to og position
        const deltaVector = { x: star.ogX - star.x, y: star.ogY - star.y };
        if (Math.abs(deltaVector.x) > 0 || Math.abs(deltaVector.y) > 0) {
          star.x += deltaVector.x * 0.5;
          star.y += deltaVector.y * 0.5;
        }
      }
    }
  }

  updateSpringPhysics(draggedStar) {
    // 1. Apply physics to N points before and after
    let visited = new Set();
    let queue = [{ star: draggedStar, depth: 0 }];

    while (queue.length) {
      const { star, depth } = queue.shift();
      if (!star || visited.has(star) || depth > influenceRadius) continue;
      visited.add(star);

      // Hooke’s Law: apply spring force between this star and its neighbors
      for (let neighbor of [star.inStars[0], star.outStars[0]]) {
        if (!neighbor || visited.has(neighbor)) continue;

        const dx = neighbor.x - star.x;
        const dy = neighbor.y - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
        const force = springConstant * (dist - restLength);

        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        // apply force to neighbor's velocity
        neighbor.vx = (neighbor.vx || 0) - fx;
        neighbor.vy = (neighbor.vy || 0) - fy;

        queue.push({ star: neighbor, depth: depth + 1 });
      }
    }

    // 2. Update positions of all stars
  }
}

export default StarManager;
