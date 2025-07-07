import uuidv4 from "./helpers/uuidv4";

class Star {
  constructor(x, y, inStars = [], outStars = []) {
    this.ogX = x;
    this.ogY = y;
    this.x = x;
    this.y = y;
    this.hasSwitched = false;
    this.hasSwitchedPartOne = false;

    this.wouldLikeToBeStar = null;

    this.modX = 0;
    this.modY = 0;

    this.xPlusCosmetic = 0;
    this.yPlusCosmetic = 0;
    this.inStars = inStars;
    this.outStars = outStars;

    this.starID = uuidv4();
  }

  moveTowardsGoal(starIDToStarMap, oldStarIDToOldStarMap) {
    if (!this.wouldLikeToBeStar) return null;

    if (this.hasSwitched) return null;

    const snapThreshold = 1;
    const snapThresholdSquared = snapThreshold * snapThreshold;
    const dx = this.wouldLikeToBeStar.x - (this.x + this.modX);
    const dy = this.wouldLikeToBeStar.y - (this.y + this.modY);
    const distSquared = dx * dx + dy * dy;

    if (!this.hasSwitchedPartOne) {
      const distFromOutCurrent = Math.sqrt(
        (this.outStars[0].x + this.outStars[0].modX - (this.x + this.modX)) **
          2 +
          (this.outStars[0].y + this.outStars[0].modY - (this.y + this.modY)) **
            2
      );

      const distFromOutNext = Math.sqrt(
        (oldStarIDToOldStarMap[this.wouldLikeToBeStar.outStars[0].starID].x +
          oldStarIDToOldStarMap[this.wouldLikeToBeStar.outStars[0].starID]
            .modX -
          this.x -
          this.modX) **
          2 +
          (oldStarIDToOldStarMap[this.wouldLikeToBeStar.outStars[0].starID].y +
            oldStarIDToOldStarMap[this.wouldLikeToBeStar.outStars[0].starID]
              .modY -
            this.y -
            this.modY) **
            2
      );

      if (distFromOutCurrent > distFromOutNext) {
        this.inStars = [
          oldStarIDToOldStarMap[this.wouldLikeToBeStar.inStars[0].starID],
        ]; // TODO: Adjust for multi-out
        this.outStars = [
          oldStarIDToOldStarMap[this.wouldLikeToBeStar.outStars[0].starID],
        ];

        this.hasSwitchedPartOne = true;
      }
    }

    if (distSquared < snapThresholdSquared) {
      this.x = this.wouldLikeToBeStar.x;
      this.y = this.wouldLikeToBeStar.y;
      this.modX = 0;
      this.modY = 0;
      this.ogX = this.wouldLikeToBeStar.ogX;
      this.ogY = this.wouldLikeToBeStar.ogY;
      this.inStars = [
        starIDToStarMap[this.wouldLikeToBeStar.inStars[0].starID],
      ]; // TODO: Adjust for multi-out
      this.outStars = [
        starIDToStarMap[this.wouldLikeToBeStar.outStars[0].starID],
      ];
      this.hasSwitched = true;
    } else {
      this.modX += dx / 10;
      this.modY += dy / 10;
    }

    return false;
  }
}

export default Star;
