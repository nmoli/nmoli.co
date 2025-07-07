import { useEffect, useState } from "react";
import styled from "styled-components";
import Colours from "./constants/Colors";
import "./globalStyles.css";
import runGameLoop, {
  handleMouseClicked,
  handleMouseMove,
  handleMouseReleased,
} from "./waves/runGameLoop";
import MainContent from "./page/MainContent.jsx";

function App() {
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseClicked);
    window.addEventListener("mouseup", handleMouseReleased);

    runGameLoop(undefined, setForceUpdate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseClicked);
      window.removeEventListener("mouseup", handleMouseReleased);
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
