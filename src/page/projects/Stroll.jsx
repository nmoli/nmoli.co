import styled from "styled-components";
import Text from "../../components/Text.jsx";
import Colors from "../../constants/Colors.js";
import TiltedCard from "../../components/TiltedCard.jsx";
import Linebreak from "../../components/Linebreak.jsx";

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
        <Text size="16px" color={Colors.TEXT_PRIMARY}>
          ·
        </Text>
        <Text size="16px" color={Colors.ACCENT_SOFT}>
          Github
        </Text>
        <Text size="16px" color={Colors.TEXT_PRIMARY}>
          ·
        </Text>
        <a href="https://www.newgrounds.com/portal/view/715384" target="_blank">
          <Text size="16px" color={Colors.ACCENT_SOFT}>
            Newgrounds
          </Text>
        </a>
      </div>

      <Text size="16px" color={Colors.TEXT_MUTED}>
        Reach the exit by drawing platforms that persist between levels. Careful
        not to get in your own way !
      </Text>
      <div className="strollContainer">
        <iframe
          src="https://www.youtube.com/embed/DLAJrwrumFQ?autoplay=1&loop=1"
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
        #42 for the theme "running out of space", working with @jerripo for art
        and @syncrocat.
      </Text>
      <Text size="16px" color={Colors.TEXT_MUTED} className="descriptionBody">
        You are a bouncing hamster trying to reach the exit, with the power to
        draw any platforms necessary to complete the level. However, these
        platforms stick around on the screen for all future levels, which will
        quickly restrict your movement if you don't plan ahead. Resetting the
        game and visualizing all the levels you've seen so far are critical for
        advancing.
      </Text>
      <Linebreak />
      <Text size="16px" color={Colors.TEXT_MUTED}>
        The collisions in this game were coded without an engine, which was a
        fun challenge considering the platforms could be any sort of shape.
      </Text>
      <Text size="16px " color={Colors.TEXT_MUTED} className="descriptionBody">
        The lines drawn by the player are stored as a set of points in an [x][y]
        map. Given the player's position and velocity, I queried the map for all
        points that could be in the player's path.
      </Text>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <img
          src="/nmoli.co/assets/stroll_physics.png"
          className="graphImg"
          style={{ maxWidth: "400px" }}
        />
      </div>
      <Text size="16px " color={Colors.TEXT_MUTED} className="descriptionText">
        The pixel with the smallest distance to the player was identified, and a
        line to represent the collission surface was established between 2
        pixels, upstream and downstream from the colliding pixel respectively.
      </Text>
      <Text size="16px " color={Colors.TEXT_MUTED} className="descriptionBody">
        From here, the player's movement vector was reflected through the
        collission surface's normal vector.
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

  .descriptionText {
    margin-top: 1rem;
  }

  .descriptionBody {
    margin-top: 0.5rem;
  }

  .graphImg {
    width: 100%;
    height: auto;
    margin: 0;
    margin-top: 1rem;
    border-radius: 8px;
  }

  .strollContainer {
    // padding: 0 4rem;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .youtubeEmbed {
    aspect-ratio: 9/7;
    margin-top: 0.5rem;
    flex: 1;
    max-width: 500px;
  }
`;
