import styled from "styled-components";
import Text from "../../components/Text.jsx";
import Colors from "../../constants/Colors.js";
import TiltedCard from "../../components/TiltedCard.jsx";
import Linebreak from "../../components/Linebreak.jsx";

export default ({ changeProject }) => {
  return (
    <Container>
      <Text size="24px" color={Colors.TEXT_HIGHLIGHT}>
        Facebook messenger chat distribution visualizer
      </Text>
      <div className="infoRow">
        <Text size="16px" color={Colors.TEXT_PRIMARY}>
          Python | numpy
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
        Generates interactive stacked bar chart showing user's most active chats
        over time.
      </Text>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="/nmoli.co/assets/messenger_graph_2_anonymized.png"
          className="graphImg"
        />
      </div>
      {/* <TiltedCard
        imageSrc="/nmoli.co/assets/messenger_graph_2.png"
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
      <TiltedCard
        imageSrc="/nmoli.co/assets/messenger_graph_2.png"
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
      /> */}
      <div style={{ textAlign: "center", width: "100%", marginTop: "0.5rem" }}>
        <Text size="16px" color={Colors.TEXT_MUTED}>
          My (anonymized) chat distribution throughout 2015 - 2021
        </Text>
        <Text size="16px" color={Colors.TEXT_MUTED}>
          one bar = one month
        </Text>
      </div>
      <Linebreak />
      <Text size="16px" color={Colors.TEXT_MUTED} className="description">
        Facebook lets you export{" "}
        <a
          href="https://www.facebook.com/help/212802592074644/"
          target="_blank"
        >
          a big blob of data
        </a>{" "}
        that contains all the information they have on you, including all the
        messages you've sent on Facebook Messenger. But it's spread across
        hundreds of files in hundreds of folders, which makes it not very
        readable. I was curious to see what my historic usage of the app looked
        like, so I built a parser and visualizer, and tweaked it until I got
        something I thought was most informative, pictured above.
      </Text>
      {/* <Text size="16px" color={Colors.TEXT_MUTED} className="description">
        It was quite disturbing to find out that some months at the height of
        covid I exchanged almost 30K messages with a single person, which was
        more than double the total messages I sent and received in other months.
      </Text> */}
      <Text size="16px" color={Colors.TEXT_MUTED} className="description">
        This graph also happens to visually showcase the impact of{" "}
        <span
          style={{
            color: Colors.LINK,
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => changeProject("Dogechat")}
        >
          developing dogechat
        </span>{" "}
        on my messenger usage.
      </Text>
      <Text size="16px" color={Colors.TEXT_MUTED} className="description">
        The visualizer comes with a bunch of customizable parameters to tweak
        how you want to see your data, and you can configure it to only target a
        subset of your chats.
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
    max-width: 800px;
  }
`;
