import styled from "styled-components";
import ProjectsGrid from "./ProjectsGrid";
import { useEffect, useRef, useState } from "react";
import InfoPanelEmpty from "./InfoPanelEmpty";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/styles/overlayscrollbars.css"; // Import default styles
import Colors from "../constants/Colors";
import StarBubble from "./projects/StarBubble";
import SampleProject from "./projects/SampleProject";
import Stroll from "./projects/Stroll";
import EcoLogical from "./projects/EcoLogical";
import DogeChat from "./projects/DogeChat";

const MainContent = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollRef = useRef(null);

  const projects = [
    {
      name: "Dogechat",
      component: DogeChat,
      url: "/nmoli.co/assets/react_wheel_3.png",
    },
    {
      name: "StarBubble Engine",
      component: "StarBubble Engine",
      url: "/nmoli.co/assets/starbubble.png",
    },
    {
      name: "Messenger",
      component: SampleProject,
      url: "/nmoli.co/assets/messenger_graph_2_anonymized.png",
    },
    {
      name: "Stroll",
      component: Stroll,
      url: "/nmoli.co/assets/stroll_ico.png",
    },
    {
      name: "EcoLogical",
      component: EcoLogical,
      url: "/nmoli.co/assets/eco_ico.png",
    },
  ];

  const changeProject = (projectName) => {
    const project = projects.find((p) => p.name === projectName);
    if (project) {
      setSelectedProject(project);
      scrollRef.current?.scrollTo(0, 0); // Scroll to top of the about panel
    } else {
      setSelectedProject(null);
    }
  };

  return (
    <Container id="wave-canvas-container">
      <div
        style={{
          height: "80vh",
          width: "80vw",
          maxWidth: "1200px",
          maxHeight: "90vh",
        }}
      >
        <div className="internalContainer">
          <div className="topContentContainer">
            <div className="nameContainer">
              {/* <div className="preNameContainer">Hi! I'm</div> */}
              <span className="red">N</span>ick{" "}
              <span className="red">Moli</span>
              nari
            </div>
            {/* <div>
              I currently do full stack React development at{" "}
              <a href="https://vgen.co/" target="_blank">
                VGen.co
              </a>
            </div> */}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              marginTop: "1rem",
              // marginBottom: "1rem",
            }}
          >
            <div
              style={{ width: "144px", textAlign: "left", marginLeft: "2rem" }}
            >
              Projects:
            </div>
            {!selectedProject ? (
              <div />
            ) : (
              //  style={{ flex: 1, textAlign: "left" }}>About me:</div>
              <div
                onClick={() => setSelectedProject(0)}
                style={{
                  cursor: "pointer",
                  flex: 1,
                  textAlign: "left",
                  color: Colors.ACCENT_SOFT,
                }}
              >
                {`< Back`}
              </div>
            )}
          </div>
          <div className="panelsContainer">
            <OverlayScrollbarsComponent
              className="projectsPanel"
              style={{ height: "100%" }}
              options={{
                scrollbars: { autoHide: "never" },
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="spacer" />
                <div className="projectsPanelInner">
                  {/* projects: */}
                  <ProjectsGrid
                    setSelectedProject={setSelectedProject}
                    selectedProject={selectedProject}
                    projects={projects}
                  />
                </div>
                <div className="spacer" />
              </div>
            </OverlayScrollbarsComponent>

            <OverlayScrollbarsComponent
              className="aboutPanel"
              options={{ scrollbars: { autoHide: "never" } }}
              style={{ height: "100%" }}
              ref={scrollRef}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="aboutPanelInner">
                  {/* about: */}
                  {selectedProject?.name === "StarBubble Engine" ? (
                    <StarBubble />
                  ) : selectedProject ? (
                    selectedProject.component({ changeProject })
                  ) : (
                    <InfoPanelEmpty changeProject={changeProject} />
                  )}
                </div>
                <div className="spacer" />
              </div>
            </OverlayScrollbarsComponent>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MainContent;

const Container = styled.div`
  // margin: 0 auto;
  // text-align: center;
  // width: 900px;
  // height: 80vh;
  // overflow-y: auto; /* Enables vertical scrolling */

  padding: 3rem 2rem;

  .topContentContainer {
    padding: 0 2rem;
  }

  a {
    color: ${Colors.ACCENT_SOFT};
  }

  .internalContainer {
    // padding: 4rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .os-scrollbar-handle {
    background-color: ${Colors.ACCENT};
    opacity: 0.23;
  }

  .panelsContainer {
    display: flex;
    gap: 1rem;
    // margin-top: 2rem;
    width: 100%;
    flex: 1;
    overflow-y: auto;
    // overflow-x: visible;

    .projectsPanel {
      // flex: 1;
      text-align: left;
      // overflow-x: visible;
      display: flex;
      flex-direction: row;

      .os-scrollbar {
        // margin-right: 0.5rem;
        left: 0;
      }

      .spacer {
        width: 2rem;
        height: 2rem;
      }

      .projectsPanelInner {
        display: flex;
        flex-direction: column;
      }
    }

    .aboutPanel {
      flex: 1;
      text-align: left;
      width: 100%;

      .os-scrollbar {
        // margin-right: 0.5rem;
        right: 0;
      }

      display: flex;
      flex-direction: row;

      .aboutPanelInner {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .spacer {
        width: 2rem;
        height: 2rem;
      }
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
    font-size: 3rem;
    line-height: 1.1;
    /* color: black; */
    position: relative;
    // display: inline-block;
    // background: black;
    // background-size: 200%;
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    // transition: background-position 0.8s ease;

    .red {
      color: #00b8d9;
      // -webkit-text-fill-color: #00b8d9; /* Keep red letters solid */
      background: none;
      // -webkit-background-clip: border-box; /* Disable background-clip for red letters */
    }
  }

  .nameContainer:hover {
    // background: linear-gradient(
    //   90deg,
    //   /* Left to right */ black 0%,
    //   black 40%,
    //   white 50%,
    //   black 60%,
    //   black 100%
    // );
    // background-size: 200%;
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    // transition: background-position 0.8s ease;

    // background-position: 100% 0;
  }
`;
