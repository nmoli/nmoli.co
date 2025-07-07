import StarManager from "./StarManager";
// import drawCircle from "../d/drawCircle";
import drawRect from "./drawRect";
import drawRectAtDiv from "./drawRectAtDiv";
import { moveStarCosmetic } from "./moveStarCosmetic";

// CONSTANTS
const HAS_NOISE_ON = true;
const IS_WRITE_MODE = false;
const INTERPOLATE_COLOR = true;

let timeDeltaTally = 0;

let prevTimestamp = 0;
let hasBeenInit = false;
let starManager;
let starManagerRed;
let canvasHasBeenInit = false;

let lastMouseX = undefined;
let lastMouseY = undefined;
let prevMouseX = 0;
let prevMouseY = 0;

let starBubbleEngineDemo = null;

export function handleMouseMove(event) {
  const canvas = document.getElementById("wave-canvas");
  if (canvas instanceof HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    lastMouseX = event.clientX - rect.left;
    lastMouseY = event.clientY - rect.top;
  }
}

let isClicked = false;
export function handleMouseClicked(event) {
  isClicked = true;
}

export function handleMouseReleased(event) {
  isClicked = false;
}

export function turnOnDoggoPostShitter() {
  isDoggoPostShitterOn = true;
}

export function turnOnStarBubbleEngineDemo(isOff) {
  if (isOff) {
    starBubbleEngineDemo = null;
  }

  if (starBubbleEngineDemo) {
    starBubbleEngineDemo.remove();
  }
  starBubbleEngineDemo = document.getElementById("star-bubble-demo");
  if (starBubbleEngineDemo) {
    starManagerRed = new StarManager();
    const rect = drawRectAtDiv(starBubbleEngineDemo);
    starManagerRed.addStarsInOrder(rect, 2);
  }
}

export function toggleConfigs() {}

const randomListToLog = [];

// Collission detection code
function ccw(A, B, C) {
  return (C.y - A.y) * (B.x - A.x) > (B.y - A.y) * (C.x - A.x);
}
function segmentsIntersect(p1, p2, q1, q2) {
  return (
    ccw(p1, q1, q2) !== ccw(p2, q1, q2) && ccw(p1, p2, q1) !== ccw(p1, p2, q2)
  );
}

let Configs = [];
let currentConfigID = "config1";

let wasJustClickingBroISTG = false;
let releasedSinceLastClicked = false;

function interpolateColor(mouseX, mouseY, newCoords) {
  const maxDistance = 250;
  const minDistance = 80;

  // const green = { r: 0, g: 184, b: 217 };
  const green = { r: 0, g: 220, b: 255 };
  //255, 111, 97
  const orange = { r: 255, g: 111, b: 97 };

  const dx = mouseX - newCoords.x;
  const dy = mouseY - newCoords.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  let t;
  if (distance >= maxDistance) {
    t = 0; // fully green
  } else if (distance <= minDistance) {
    t = 1; // fully orange
  } else {
    t = 1 - (distance - minDistance) / (maxDistance - minDistance);
  }

  const r = Math.round(green.r + (orange.r - green.r) * t);
  const g = Math.round(green.g + (orange.g - green.g) * t);
  const b = Math.round(green.b + (orange.b - green.b) * t);

  if (!INTERPOLATE_COLOR || !mouseX) {
    // { r: 0, g: 220, b: 255 };
    return "rgb(0, 220, 255)";
    // return "rgb(255, 111, 97)";
    return "rgb(166, 240, 15)";
  }
  return `rgb(${r}, ${g}, ${b})`;
}

export default function runGameLoop(timestamp, setForceUpdate) {
  // Basic gameloop maintenance
  if (!timestamp && hasBeenInit) {
    return;
  } else if (!hasBeenInit) {
    // Initialization
    hasBeenInit = true;
    starManager = new StarManager();

    const rect = drawRectAtDiv(
      document.getElementById("wave-canvas-container")
    );

    starManager.addStarsInOrder(rect);
  }
  const Δtime = ((timestamp || 0) - prevTimestamp) / 1000; // seconds
  prevTimestamp = timestamp;

  // Retrieve mouse events
  const currentMouseX = lastMouseX;
  const currentMouseY = lastMouseY;
  const deltaMouseX = currentMouseX - prevMouseX;
  const deltaMouseY = currentMouseY - prevMouseY;

  // Run GameObjects vs. mouse
  // Detect when mouse crosses through two attached points
  const applyDoggoToStar = (star, dx, dy) => {
    if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
      return;
    }

    star.dx += dx;
    star.dy += dy;
    applyDoggoToStar(star.outStars[0], dx * 0.6, dy * 0.6);
    applyDoggoToStar(star.inStars[0], dx * 0.6, dy * 0.6);
  };

  if (isClicked && IS_WRITE_MODE) {
    const newPoin = {
      x: currentMouseX,
      y: currentMouseY,
    };

    randomListToLog.push(newPoin);

    starManagerRed.addStarsInOrder(
      [newPoin],
      releasedSinceLastClicked ? false : 2
    );
    releasedSinceLastClicked = false;

    wasJustClickingBroISTG = true;
  } else if (wasJustClickingBroISTG) {
    wasJustClickingBroISTG = false;
    releasedSinceLastClicked = true;
    console.log(
      `[${randomListToLog
        .map((item) => {
          return `{ x: ${item.x}, y: ${item.y} }`;
        })
        .join(", ")}`
    );
  }

  starManager.mouseRepelStars(
    currentMouseX,
    currentMouseY,
    Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2)
  );

  if (HAS_NOISE_ON) {
    starManager.stars?.forEach((star) => {
      const { xPlusCosmetic, yPlusCosmetic } = moveStarCosmetic(
        star,
        Δtime,
        star.outStars[0],
        timeDeltaTally > 0.03 && isClicked && !IS_WRITE_MODE
      );
      star.xPlusCosmetic = xPlusCosmetic;
      star.yPlusCosmetic = yPlusCosmetic;
    });

    starManager.setStars(starManager.stars);
  }

  if (timeDeltaTally > 0.03) {
    timeDeltaTally = 0;
  }
  timeDeltaTally += Δtime || 0;

  prevMouseX = currentMouseX;
  prevMouseY = currentMouseY;

  // console.log(`Current mouse position: (${currentMouseX}, ${currentMouseY})`);

  // Draw layer
  const canvas = document.getElementById("wave-canvas");
  if (canvas instanceof HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    if (!canvasHasBeenInit) {
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = `${canvas.offsetWidth}px`;
      canvas.style.height = `${canvas.offsetHeight}px`;

      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;

      ctx.scale(dpr, dpr);
      canvasHasBeenInit = true;
    }

    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let stars = starManager.stars || [];

    ctx.lineWidth = 3;
    const lastCoords = { x: 0, y: 0 };
    stars.forEach((star) => {
      const newCoords = {
        x: Math.floor(star.x + star.xPlusCosmetic + star.modX),
        y: Math.floor(star.y + star.yPlusCosmetic + star.modY),
      };
      ctx.beginPath();

      ctx.strokeStyle = interpolateColor(
        currentMouseX,
        currentMouseY,
        newCoords
      );

      if (newCoords.x !== lastCoords.x || newCoords.y !== lastCoords.y) {
        ctx.moveTo(Math.floor(newCoords.x), Math.floor(newCoords.y));
        // TODO: Optimize draw render cycle when switching to multi-level array based storage of stars
      }

      const nextCoords = star.outStars[0]
        ? {
            x:
              star.outStars[0].x +
              star.outStars[0].xPlusCosmetic +
              star.outStars[0].modX,
            y:
              star.outStars[0].y +
              star.outStars[0].yPlusCosmetic +
              star.outStars[0].modY,
          }
        : undefined;

      // const xc = (newCoords.x + nextCoords.x) / 2;
      // const yc = (newCoords.y + nextCoords.y) / 2;
      // ctx.quadraticCurveTo(
      //   Math.floor(xc),
      //   Math.floor(yc),
      //   Math.floor(nextCoords.x),
      //   Math.floor(nextCoords.y)
      // );

      if (nextCoords) {
        ctx.lineTo(Math.floor(nextCoords.x), Math.floor(nextCoords.y));
      }
      lastCoords.x = newCoords.x;
      lastCoords.y = newCoords.y;

      ctx.stroke();
    });

    ctx.closePath();

    // ctx.beginPath();

    // ctx.strokeStyle = "red";

    // stars
    //   .filter((star) => star.wouldLikeToBeStar)
    //   .map((star) => star.wouldLikeToBeStar)
    //   .forEach((star) => {
    //     const newCoords = {
    //       x: Math.floor(star.x + star.xPlusCosmetic),
    //       y: Math.floor(star.y + star.yPlusCosmetic),
    //     };

    //     if (newCoords.x !== lastCoords.x || newCoords.y !== lastCoords.y) {
    //       ctx.moveTo(Math.floor(newCoords.x), Math.floor(newCoords.y));
    //       // TODO: Optimize draw render cycle when switching to multi-level array based storage of stars
    //     }

    //     const nextCoords = {
    //       x: star.outStars[0].x + star.outStars[0].xPlusCosmetic,
    //       y: star.outStars[0].y + star.outStars[0].yPlusCosmetic,
    //     };

    //     // const xc = (newCoords.x + nextCoords.x) / 2;
    //     // const yc = (newCoords.y + nextCoords.y) / 2;
    //     // ctx.quadraticCurveTo(
    //     //   Math.floor(xc),
    //     //   Math.floor(yc),
    //     //   Math.floor(nextCoords.x),
    //     //   Math.floor(nextCoords.y)
    //     // );

    //     ctx.lineTo(Math.floor(nextCoords.x), Math.floor(nextCoords.y));
    //     lastCoords.x = newCoords.x;
    //     lastCoords.y = newCoords.y;
    //   });
    // ctx.closePath();

    // ctx.stroke();
  }

  requestAnimationFrame((timestamp) => runGameLoop(timestamp, setForceUpdate));
  setForceUpdate((prev) => !prev);
}

export function getGameStars() {
  return starManager?.stars || [];
}

//**
//
// More canvas optimizing:
//
// 1. Use Perlin or Simplex Noise
// These noise types are coherent, meaning values change smoothly over time and space.
//
// 2. Instead of jumping to new noisy positions instantly, interpolate between old and new positions:
// pt.x += (targetX - pt.x) * 0.1;

// Slow down the temporal change
// Lower the Amplitude of the Noise

// 4.  Use Multi-Octave (Fractal) Noise
/**
 * function fractalNoise(x, y, time) {
  let total = 0;
  let freq = 1;
  let amp = 1;
  for (let i = 0; i < 3; i++) {
    total += noise(x * freq, y * freq, time) * amp;
    freq *= 2;
    amp *= 0.5;
  }
  return total;
}
 */

/*
4. Interpolate Between Shapes Over Time
Instead of redrawing fresh noise-based shapes each frame, animate between two versions:

js
Copy
Edit
currentShape = lerpShape(previousShape, nextShape, t);
*/

// The main difference betwen SVG and canvas:
/**
 * 
 * 5. SVG Has Path Interpolation for Free
Remember: SVG animations often tween entire path shapes over time via D3, SMIL, or CSS transitions. That’s a huge reason it looks smoother — even if your noise is technically the same, canvas doesn’t tween anything unless you do.
 */
