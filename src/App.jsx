import { useEffect, useState } from "react";
import styled from "styled-components";
import Colours from "./constants/Colors";
import "./globalStyles.css";
import runGameLoop, {
  handleMouseClicked,
  handleMouseMove,
  handleMouseReleased,
  initGame,
} from "./waves/runGameLoop";
import MainContent from "./page/MainContent.jsx";

const remakeGame = () => {
  initGame();
  // REsize canbas
  const canvas = document.getElementById("wave-canvas");
  const ctx = canvas.getContext("2d");

  // Set the actual canvas dimensions (drawing buffer)
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  console.log(window.innerWidth);
  console.log(canvas.width);

  const dpr = window.devicePixelRatio || 1;
  canvas.style.width = `${canvas.offsetWidth}px`;
  canvas.style.height = `${canvas.offsetHeight}px`;

  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;

  ctx.scale(dpr, dpr);
};

function App() {
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseClicked);
    window.addEventListener("mouseup", handleMouseReleased);
    window.addEventListener("resize", remakeGame);
    initGame();

    runGameLoop(undefined, setForceUpdate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseClicked);
      window.removeEventListener("mouseup", handleMouseReleased);
      window.removeEventListener("resize", remakeGame);
    };
  }, []);

  return (
    <Container>
      <MainContent />
      <canvas id="wave-canvas"></canvas>
    </Container>
  );
}

export default App;

const Container = styled.div`
  color: ${Colours.TEXT_PRIMARY};

  #wave-canvas {
    height: 100%;
    left: 0;
    pointer-events: none;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
  }
`;
