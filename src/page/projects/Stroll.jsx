import styled from "styled-components";
import Text from "../../components/Text.jsx";
import Colors from "../../constants/Colors.js";
import TiltedCard from "../../components/TiltedCard.jsx";

export default () => {
  return (
    <Container>
      <Text size="24px" color={Colors.TEXT_HIGHLIGHT}>
        St. Roll goes for a stROLL
      </Text>
      <div className="infoRow">
        <Text size="16px" color={Colors.TEXT_PRIMARY}>
          JS | PixiJS
        </Text>
      </div>
      <a href="https://www.newgrounds.com/portal/view/715384">
        <Text size="16px" color={Colors.ACCENT_SOFT}>
          https://www.newgrounds.com/portal/view/715384
        </Text>
      </a>
      <Text size="16px" color={Colors.TEXT_MUTED}>
        Puzzle platformer where the platforms you draw persist between levels.
      </Text>
      <TiltedCard
        imageSrc="/public/projects/messenger_graph_2.png"
        className="graphImg"
        containerHeight="337px"
        containerWidth="100%"
        imageHeight="337px"
        imageWidth="100%"
        rotateAmplitude={2}
        scaleOnHover={1.1}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
      />
      <div style={{ textAlign: "center", width: "100%", marginTop: "0.5rem" }}>
        <Text size="16px" color={Colors.TEXT_MUTED}>
          My chat distribution throughout 2015 - 2021
        </Text>
        <Text size="16px" color={Colors.TEXT_MUTED}>
          one bar = one month
        </Text>
      </div>
    </Container>
  );
};

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
`;
