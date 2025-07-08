import styled from "styled-components";
import Colors from "../constants/Colors";

const InfoPanelEmpty = ({ changeProject }) => {
  return (
    <Container>
      <Text size="16px" color={Colors.TEXT_MUTED} style={{ marginTop: "1rem" }}>
        I'm a software developer with 6+ years of professional experience,
        mostly building{" "}
        <span style={{ color: Colors.ACCENT_SOFT }}>web apps</span> and{" "}
        <span style={{ color: Colors.ACCENT_SOFT }}>cloud systems</span>, and
        15+ years of hobby experience in all sorts of technologies.
      </Text>
      <Text size="16px" color={Colors.TEXT_MUTED} style={{ marginTop: "1rem" }}>
        Right now I wear many many hats at{" "}
        <a href="https://vgen.co/" target="_blank">
          VGen.co
        </a>
      </Text>
      <Text size="16px" color={Colors.TEXT_MUTED} style={{ marginTop: "1rem" }}>
        Outside of work, I tend to build various{" "}
        <span
          style={{ color: Colors.ACCENT_SOFT, cursor: "pointer" }}
          onClick={() => changeProject("Dogechat")}
        >
          web technologies
        </span>{" "}
        for personal use or to learn more about a topic. I also participate in{" "}
        <span
          style={{ color: Colors.ACCENT_SOFT, cursor: "pointer" }}
          onClick={() => changeProject("Stroll")}
        >
          game jams
        </span>
        , and sometimes do{" "}
        <span
          style={{ color: Colors.ACCENT_SOFT, cursor: "pointer" }}
          onClick={() => changeProject("Messenger")}
        >
          other things
        </span>
        .
      </Text>
      <Text size="16px" color={Colors.TEXT_MUTED} style={{ marginTop: "1rem" }}>
        When I'm not in front of my computer, I like taking long walks around
        cities, exploring trails on foot or by bike, and hanging out with my
        cat.
      </Text>
      <Text size="16px" color={Colors.TEXT_MUTED} style={{ marginTop: "1rem" }}>
        You can contact me at nick.a.molinari@gmail.com
      </Text>
    </Container>
  );
};

export default InfoPanelEmpty;

const Container = styled.div``;
