import styled from "styled-components";
import Text from "../../components/Text.jsx";
import Colors from "../../constants/Colors.js";
import TiltedCard from "../../components/TiltedCard.jsx";

export default () => {
  return (
    <Container>
      <Text size="24px" color={Colors.TEXT_HIGHLIGHT}>
        Secret Queen Chess
      </Text>
      <div className="infoRow">
        <Text size="16px" color={Colors.TEXT_PRIMARY}>
          JS | React | Node
        </Text>
        <Text size="16px" color={Colors.TEXT_PRIMARY}>
          ·
        </Text>
        <a href="https://www.secretqueenchess.com" target="_blank">
          <Text size="16px" color={Colors.ACCENT_SOFT}>
            SecretQueenChess.Com
          </Text>
        </a>
      </div>
      <Text size="16px" color={Colors.TEXT_MUTED}>
        Chess variant where one of each player's pawns is a hidden queen,
        unrevealed until it's first non-pawnlike move.
      </Text>
      <div className="strollContainer">
        <iframe
          src="https://www.youtube.com/embed/y5Z48elPNNg?autoplay=1&loop=1"
          className="youtubeEmbed"
          frameBorder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; autoplay"
          allowFullScreen="allowfullscreen"
        ></iframe>
      </div>
      {/* <div style={{ textAlign: "center", width: "100%", marginTop: "0.5rem" }}>
        <Text size="16px" color={Colors.TEXT_MUTED}>
          Careful not to get in your own way !
        </Text>
      </div> */}
      <Text size="16px" color={Colors.TEXT_MUTED} className="descriptionText">
        Currently in development. Coming sooon to
        https://www.secretqueenchess.com !
      </Text>
      {/* <Text size="16px" color={Colors.TEXT_MUTED} className="descriptionBody">
        The player draws cards to nurture their ecosystem, which grows and
        changes over time. The player can discard cards to make room for new
        ones, but must be careful not to let their ecosystem die out.
      </Text> */}
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

  .strollContainer {
    padding: 0 4rem;
    display: flex;
    justify-content: center;
    // width: 100%;
  }

  .youtubeEmbed {
    aspect-ratio: 1;
    margin-top: 0.5rem;
    flex: 1;
  }

  .descriptionText {
    margin-top: 1rem;
  }

  .descriptionBody {
    margin-top: 0.5rem;
  }
`;
