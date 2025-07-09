import styled from "styled-components";
import Text from "../../components/Text.jsx";
import Colors from "../../constants/Colors.js";
import TiltedCard from "../../components/TiltedCard.jsx";

export default () => {
  return (
    <Container>
      <Text size="24px" color={Colors.TEXT_HIGHLIGHT}>
        Eco Logical
      </Text>
      <div className="infoRow">
        <Text size="16px" color={Colors.TEXT_PRIMARY}>
          JS | PixiJS
        </Text>
        <Text size="16px" color={Colors.TEXT_PRIMARY}>
          ·
        </Text>
        <a href="https://www.newgrounds.com/portal/view/721132" target="_blank">
          <Text size="16px" color={Colors.LINK}>
            Newgrounds
          </Text>
        </a>
      </div>
      <Text size="16px" color={Colors.TEXT_MUTED}>
        Play, save, and discard drawn cards to nurture your growing ecosystem.
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
        This game was made in 48h for the game jam{" "}
        <a href="https://ludumdare.com/" target="_blank">
          Ludum Dare
        </a>{" "}
        #43 for the theme "Sacrifices must be made", working with @jerripo for
        art and @syncrocat.
      </Text>
      <Text size="16px" color={Colors.TEXT_MUTED} className="descriptionBody">
        Every round, the player is dealt 3 cards, of which they must activate
        one, shuffle one back into the deck, and discard one. Creature cards
        generate a certain number of stars per turn, and effect cards will have
        different impacts on the creatures. The goal is to generate as many
        stars as possible by the time the deck has depleted.
      </Text>
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
    // padding: 0 4rem;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .youtubeEmbed {
    aspect-ratio: 1;
    margin-top: 0.5rem;
    flex: 1;
    max-width: 500px;
  }

  .descriptionText {
    margin-top: 1rem;
  }

  .descriptionBody {
    margin-top: 0.5rem;
  }
`;
