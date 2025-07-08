import styled from "styled-components";
import Text from "../../components/Text.jsx";
import Colors from "../../constants/Colors.js";
import TiltedCard from "../../components/TiltedCard.jsx";

export default () => {
  return (
    <Container>
      <Text size="24px" color={Colors.TEXT_HIGHLIGHT}>
        dogechat
      </Text>
      <div className="infoRow">
        <Text size="16px" color={Colors.TEXT_PRIMARY}>
          JS | React | Google Cloud
        </Text>
        <Text size="16px" color={Colors.TEXT_PRIMARY}>
          ·
        </Text>
        <a href="https://www.secretqueenchess.com" target="_blank">
          <Text size="16px" color={Colors.ACCENT_SOFT}>
            Github
          </Text>
        </a>
      </div>
      <Text size="16px" color={Colors.TEXT_MUTED}>
        Minimalistic chat app focused on security and performance.
      </Text>
      <div className="columns">
        <div className="dogechContainer">
          <iframe
            src="https://www.youtube.com/embed/fFNqNsAz814?autoplay=1&loop=1"
            className="youtubeEmbed"
            frameBorder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; autoplay"
            allowFullScreen="allowfullscreen"
          ></iframe>
        </div>
        <div className="featuresContainer">
          <Text size="24px" color={Colors.TEXT_MUTED}>
            Features:
          </Text>
          <Text size="16px" color={Colors.TEXT_MUTED}>
            - Sign in via Google
          </Text>
          <Text size="16px" color={Colors.TEXT_MUTED}>
            -{" "}
            <span style={{ color: Colors.TEXT_HIGHLIGHT }}>E2E Encrypted</span>{" "}
            (users set their own key, data encrypted at rest)
          </Text>
          <Text size="16px" color={Colors.TEXT_MUTED}>
            - File uploads, image display
          </Text>
          <Text size="16px" color={Colors.TEXT_MUTED}>
            - Replies
          </Text>
          <Text size="16px" color={Colors.TEXT_MUTED}>
            - Timestamps, read receipts, online status, typing indicators
          </Text>
          <Text size="16px" color={Colors.TEXT_MUTED}>
            - PWA-based{" "}
            <span style={{ color: Colors.TEXT_HIGHLIGHT }}>mobile support</span>
          </Text>
          <Text size="16px" color={Colors.TEXT_MUTED}>
            - Reacts, using the industry-breaking{" "}
            <span style={{ color: Colors.TEXT_HIGHLIGHT }}>React Wheel™</span>
          </Text>
          <div
            style={{ display: "flex", placeContent: "center", width: "100%" }}
          >
            <img
              src="/public/projects/react_wheel.png"
              className="graphImg"
              style={{
                maxWidth: "191px",
                display: "flex",
                placeContent: "center",
              }}
            />
          </div>
        </div>
      </div>
      {/* <div style={{ textAlign: "center", width: "100%", marginTop: "0.5rem" }}>
        <Text size="16px" color={Colors.TEXT_MUTED}>
          Careful not to get in your own way !
        </Text>
      </div> */}

      {/* <Text size="16px" color={Colors.TEXT_MUTED} className="descriptionBody">
        The player draws cards to nurture their ecosystem, which grows and
        changes over time. The player can discard cards to make room for new
        ones, but must be careful not to let their ecosystem die out.
      </Text> 
      
       E2E encryption, file uploads, replies,
        reacts, timestamps, and a reactions wheel. Built for personal use.*/}
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

  .columns {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    width: 100%;
    flex: 1;
  }

  .youtubeEmbed {
    aspect-ratio: 1 / 2;
    margin-top: 0.5rem;
    flex: 1;
  }

  .featuresContainer {
    flex: 1;
  }

  .dogechContainer {
    width: 100%;
    max-width: 250px;
  }

  .descriptionText {
    margin-top: 1rem;
  }

  .descriptionBody {
    margin-top: 0.5rem;
  }
`;
