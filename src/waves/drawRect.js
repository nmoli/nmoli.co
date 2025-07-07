export default function drawRect({
  x,
  y,
  x2,
  y2,
  borderRadius = 15,
  t,
  stepSize = 3,
  color,
}) {
  const STEP_SIZE = stepSize;

  const addPointsForEdgeIdempotent = ({ points, hasDoneLog, edge }) => {
    if (hasDoneLog[edge]) {
      return;
    } else {
      hasDoneLog[edge] = true;
    }

    // TODO: Move this so its only calced once
    const width = x2 - x;
    const height = y2 - y;
    const numStepsX = Math.floor(width / STEP_SIZE);
    const numStepsY = Math.floor(height / STEP_SIZE);
    const stepX = width / numStepsX;
    const stepY = height / numStepsY;

    if (edge === "top") {
      for (
        let i = borderRadius / stepX;
        i <= numStepsX - borderRadius / stepX;
        i++
      ) {
        points.push({ x: x + i * stepX, y });
      }
    } else if (edge === "right") {
      for (
        let i = borderRadius / stepY;
        i <= numStepsY - borderRadius / stepY;
        i++
      ) {
        points.push({ x: x2, y: y + i * stepY });
      }
    } else if (edge === "bottom") {
      for (
        let i = numStepsX - borderRadius / stepX;
        i >= 0 + borderRadius / stepX;
        i--
      ) {
        points.push({ x: x + i * stepX, y: y2 });
      }
    } else if (edge === "left") {
      for (
        let i = numStepsY - borderRadius / stepY;
        i >= 0 + borderRadius / stepY;
        i--
      ) {
        points.push({ x, y: y + i * stepY });
      }
    }
  };

  const generatePointsFromRect = (x, y, x2, y2) => {
    // With slightly rounded corners
    const points = [];
    const hasDoneLog = {};

    // Top edge

    // Right edge

    // Bottom edge

    // Left edge

    // Corners
    for (let angle = 0; angle < 2 * Math.PI; angle += (Math.PI / 180) * 3) {
      let circleCenter = { x: x + borderRadius, y: y + borderRadius };
      let color = "blue";
      if (angle >= Math.PI && angle < (3 * Math.PI) / 2) {
        addPointsForEdgeIdempotent({
          points,
          hasDoneLog,
          edge: "left",
        });
        color = "red";
      } else if (angle >= (3 * Math.PI) / 2) {
        addPointsForEdgeIdempotent({
          points,
          hasDoneLog,
          edge: "top",
        });
        color = "purple";
        circleCenter.x = x2 - borderRadius;
      } else if (angle < Math.PI / 2) {
        addPointsForEdgeIdempotent({
          points,
          hasDoneLog,
          edge: "right",
        });
        color = "green";
        circleCenter.y = y2 - borderRadius;
        circleCenter.x = x2 - borderRadius;
      } else {
        addPointsForEdgeIdempotent({
          points,
          hasDoneLog,
          edge: "bottom",
        });
        color = "yellow";
        circleCenter.y = y2 - borderRadius;
      }

      const pointX = circleCenter.x + borderRadius * Math.cos(angle);
      const pointY = circleCenter.y + borderRadius * Math.sin(angle);
      points.push({ x: pointX, y: pointY, color });
    }
    return points;
  };
  return generatePointsFromRect(x, y, x2, y2);
}
