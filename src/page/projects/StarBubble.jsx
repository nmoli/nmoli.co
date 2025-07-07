import styled from "styled-components";
import Text from "../../components/Text.jsx";
import Colors from "../../constants/Colors.js";
import TiltedCard from "../../components/TiltedCard.jsx";
import { useEffect } from "react";

export default () => {
  // useEffect(() => {}, []);

  return (
    <Container>
      <Text size="24px" color={Colors.TEXT_HIGHLIGHT}>
        Static Bubbles
      </Text>
      <div className="infoRow">
        <Text size="16px" color={Colors.TEXT_PRIMARY}>
          JavaScript
        </Text>
      </div>
      <a href="https://www.github.com/nmoli/starbubble-engine">
        <Text size="16px" color={Colors.ACCENT_SOFT}>
          Github
        </Text>
      </a>
      <Text size="16px" color={Colors.TEXT_MUTED}>
        Adds a funky interactive border effect to any div
      </Text>
      <div id="star-bubble-demo"></div>
      <Text size="16px" color={Colors.TEXT_MUTED}>
        Written in pure JS.
      </Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  #star-bubble-demo {
    width: 100%;
    height: 200px;
    border: yellow;
    border-radius: 8px;
    position: relative;
  }

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
`;
