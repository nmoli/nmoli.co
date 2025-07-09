import styled from "styled-components";
import Text from "../../components/Text.jsx";
import Colors from "../../constants/Colors.js";
import TiltedCard from "../../components/TiltedCard.jsx";
import { useEffect } from "react";
import Codeblock from "../../components/Codeblock.jsx";
import {
  toggleMovement,
  turnOnStarBubbleEngineDemo,
} from "../../waves/runGameLoop.js";

const StarBubble = () => {
  useEffect(() => {
    turnOnStarBubbleEngineDemo();
    return () => {
      turnOnStarBubbleEngineDemo(true);
      toggleMovement(false);
    };
  }, []);

  return (
    <Container>
      <Text size="24px" color={Colors.TEXT_HIGHLIGHT}>
        WireBubbles-React
      </Text>
      <div className="infoRow">
        <Text size="16px" color={Colors.TEXT_PRIMARY}>
          JavaScript | React
        </Text>
        <Text size="16px" color={Colors.TEXT_PRIMARY}>
          ·
        </Text>
        <a href="https://www.github.com" target="_blank">
          <Text size="16px" color={Colors.LINK}>
            Github
          </Text>
        </a>
      </div>
      <Text size="16px" color={Colors.TEXT_MUTED}>
        npm package for adding funky interactive border effect to a div
      </Text>
      <Codeblock
        code={`npm install wirebubbles-react`}
        style={{ margin: "0.5rem 0" }}
      />
      <div className="demoContainer">
        <div className="beforeColumn">
          <Codeblock
            code={`<div style={{
  width: "100px", 
  height: "100px", 
  border: "1px solid yellow", 
  borderRadius: "8px"
}}>
  Hello!
</div>`}
            style={{ margin: "0.5rem 0" }}
          />
        </div>
        <div>{`->`}</div>
        <div className="afterColumn">
          <Codeblock
            code={`import { WireBubble } from "wirebubbles-react";

<WireBubble style={{ 
  width: "100px", 
  height: "100px", 
  border: "1px solid yellow",
  borderRadius: "8px"
}}>
  Hello!
</WireBubble>`}
            style={{ margin: "0.5rem 0" }}
          />
        </div>
      </div>
      <div className="demoContainer">
        <div className="beforeColumn xd">
          <div className="beforeDemo" />
        </div>
        <div>{`->`}</div>
        <div className="afterColumn xd">
          <div className="beforeDemo" id="star-bubble-demo" />
        </div>
      </div>
      <div className="demoContainer">
        <div className="beforeColumn" />
        <div className="afterColumn xd">
          <Text
            size="16px"
            color={Colors.TEXT_HIGHLIGHT}
            style={{ marginTop: "1rem" }}
          >
            ^Mouse over the border!
          </Text>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <label class="switch">
          <input
            type="checkbox"
            onChange={(e) => {
              const checked = e.target.checked;
              toggleMovement(checked);
            }}
          />
          <span class="slider round"></span>
        </label>
        <Text size="16px" color={Colors.TEXT_HIGHLIGHT}>
          {`< Click me!`}
        </Text>
      </div>
    </Container>
  );
};

export default StarBubble;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .infoRow {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    // margin-top: 0.125rem;
    gap: 1rem;
  }

  .graphImg {
    width: 100%;
    height: auto;
    margin: 0;
    margin-top: 0.5rem;
    border-radius: 8px;
  }

  .demoContainer {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin-top: 0.5rem;
    width: 100%;

    .beforeColumn,
    .afterColumn {
      flex: 1;
    }

    .xd {
      display: flex;
      place-items: center;
    }
  }

  .beforeDemo {
    width: 100px;
    height: 100px;
    border: 1px solid yellow;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #star-bubble-demo {
    border: none;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;
