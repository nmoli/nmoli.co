import styled from "styled-components";
import Text from "../../components/Text.jsx";
import Colors from "../../constants/Colors.js";
import TiltedCard from "../../components/TiltedCard.jsx";
import Linebreak from "../../components/Linebreak.jsx";

export default ({ changeProject }) => {
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
          <Text size="16px" color={Colors.LINK}>
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
            src="https://www.youtube.com/embed/fFNqNsAz814?loop=1&rel=0&showinfo=0&controls=0&autohide=1"
            className="youtubeEmbed"
            frameBorder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; autoplay"
            allowFullScreen="allowfullscreen"
            showinfo="0"
            rel="0"
            controls="0"
            autohide="1"
          ></iframe>
        </div>
        <div className="featuresContainer">
          <Text size="24px" color={Colors.TEXT_PRIMARY}>
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
            - Message reactions, using the LoL-inspired{" "}
            <span style={{ color: Colors.TEXT_HIGHLIGHT }}>React Wheel™</span>
          </Text>
          <div
            style={{ display: "flex", placeContent: "center", width: "100%" }}
          >
            <img
              src="/nmoli.co/assets/react_wheel.png"
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
      <Linebreak />
      <Text size="16px " color={Colors.TEXT_MUTED}>
        A friend and I built this because we couldn't find a single leading chat
        app that met the following criteria:
      </Text>
      <Text size="16px " color={Colors.TEXT_MUTED}>
        - Works without hassle on Desktop / Mac / Android / iOS
      </Text>{" "}
      <Text size="16px " color={Colors.TEXT_MUTED}>
        - Has reactions
      </Text>{" "}
      <Text size="16px " color={Colors.TEXT_MUTED}>
        - Is not a bloated buggy mess on the FE (@zuck)
      </Text>
      <Text size="16px " color={Colors.TEXT_MUTED}>
        - Supports multiple instances of chats between the same 2 users
      </Text>
      <Text size="16px " color={Colors.TEXT_MUTED} className="descriptionBody">
        As a side benefit, it was nice to be able to encrypt our own messages
        manually instead of having to trust a third party's claims to do so,
        which{" "}
        <a href="https://en.wikipedia.org/wiki/Operation_Trojan_Shield">
          has not always been reliable
        </a>
        .
      </Text>
      <Text size="16px " color={Colors.TEXT_MUTED} className="descriptionBody">
        As you may notice, function was prioritized over form.
      </Text>
      <Text size="16px " color={Colors.TEXT_MUTED} className="descriptionBody">
        dogechat was a smashing success in the limited social circles in which
        it was released, responsible for the downfall of{" "}
        <span
          style={{
            color: Colors.LINK,
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => changeProject("Messenger")}
        >
          my personal messenger usage.
        </span>
      </Text>
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
    flex-wrap: wrap;
    justify-content: center;
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
    // flex: 1;
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
