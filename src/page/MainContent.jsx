import styled from "styled-components";
import ProjectsGrid from "./ProjectsGrid";
import { useEffect, useState } from "react";
import InfoPanelEmpty from "./InfoPanelEmpty";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/styles/overlayscrollbars.css"; // Import default styles
import Colors from "../constants/Colors";

const MainContent = () => {
  const [infoPanelContent, setInfoPanelContent] = useState(null);

  return (
    <Container>
      <OverlayScrollbarsComponent2
        id="wave-canvas-container"
        options={{ scrollbars: { autoHide: "never" } }}
        style={{
          height: "90vh",
          width: "900px",
        }}
      >
        <div className="internalContainer">
          <div className="nameContainer">
            <div className="preNameContainer">Hi! I'm</div>
            <span className="red">N</span>ick <span className="red">M</span>
            olinari
          </div>
          <div>
            I'm interested in web development, game development, AI, and all
            sorts of technology. I currently work at VGen.co
          </div>
          <div className="panelsContainer">
            <div className="projectsPanel">
              projects:
              <ProjectsGrid setInfoPanelContent={setInfoPanelContent} />
            </div>
            <div className="aboutPanel">
              about:
              {infoPanelContent ? infoPanelContent : <InfoPanelEmpty />}
            </div>
          </div>
        </div>
      </OverlayScrollbarsComponent2>
    </Container>
  );
};

export default MainContent;

const OverlayScrollbarsComponent2 = styled(OverlayScrollbarsComponent)``;

const Container = styled.div`
  // margin: 0 auto;
  // text-align: center;
  // width: 900px;
  // height: 80vh;
  // overflow-y: auto; /* Enables vertical scrolling */

  // padding: 4rem;

  a {
    color: ${Colors.ACCENT_SOFT};
  }

  .os-scrollbar {
    // margin-right: 0.5rem;
    left: 10px;
  }

  .os-scrollbar-handle {
    background-color: ${Colors.ACCENT};
  }

  .internalContainer {
    padding: 4rem;
    text-align: center;
  }

  .panelsContainer {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    width: 100%;

    .projectsPanel {
      // flex: 1;
      text-align: left;
    }

    .aboutPanel {
      flex: 1;
      text-align: left;
    }
  }

  .nameContainer {
    position: relative;

    .preNameContainer {
      position: absolute;
      left: -200px;
    }
  }

  .nameContainer {
    font-size: 3.2em;
    line-height: 1.1;
    /* color: black; */
    position: relative;
    display: inline-block;
    background: black;
    background-size: 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: background-position 0.8s ease;

    .red {
      color: #00b8d9;
      -webkit-text-fill-color: #00b8d9; /* Keep red letters solid */
      background: none;
      -webkit-background-clip: border-box; /* Disable background-clip for red letters */
    }
  }

  .nameContainer:hover {
    background: linear-gradient(
      90deg,
      /* Left to right */ black 0%,
      black 40%,
      white 50%,
      black 60%,
      black 100%
    );
    background-size: 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: background-position 0.8s ease;

    background-position: 100% 0;
  }
`;
