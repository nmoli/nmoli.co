import styled from "styled-components";
import Colors from "../constants/Colors";
import SampleProject from "./projects/SampleProject";
import { useEffect, useRef, useState } from "react";
import TiltedCard from "../components/TiltedCard";
import Stroll from "./projects/Stroll";

const ProjectsGrid = ({ setInfoPanelContent }) => {
  const [clickedProject, setClickedProject] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const projects = [
    {
      name: "Messenger Graph",
      component: SampleProject,
      url: "/public/projects/messenger_graph.png",
    },
    {
      name: "Stroll",
      component: Stroll,
      url: "/public/projects/stroll_ico.png",
    },
    {
      name: "Sample Project 1",
      component: SampleProject,
      url: "/public/girl.jpg",
    },
    {
      name: "Sample Project 2",
      component: SampleProject,
      url: "/public/girl.jpg",
    },
    {
      name: "Sample Project 3",
      component: SampleProject,
      url: "/public/girl.jpg",
    },
  ];

  return (
    <Container>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          url={project.url}
          changeProject={(isClicked) => {
            if (isClicked) {
              setClickedProject(project);
            }
            setInfoPanelContent(project.component);
            setSelected(project.name);
          }}
          resetProject={() => {
            setInfoPanelContent(clickedProject.component || null);
            setSelected(clickedProject?.name || null);
          }}
          clearProject={() => {
            setInfoPanelContent(null);
            setClickedProject(null);
            setSelected(null);
          }}
          projectName={project.name}
          isSelected={selected === project.name}
          isVerySelected={clickedProject?.name === project.name}
        />
      ))}
    </Container>
  );
};

export default ProjectsGrid;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 6rem);
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;

  .projectCard {
    cursor: pointer;
    margin: 0;
  }
`;

const ProjectCard = ({
  isSelected,
  isVerySelected,
  isHighlighted,
  url,
  changeProject,
  resetProject,
  projectName = "Sample Project",
  clearProject,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    console.log(isSelected, projectName);
  }, [isSelected, projectName]);

  return (
    <TiltedCard
      imageSrc={url}
      containerHeight="6rem"
      containerWidth="6rem"
      imageHeight="6rem"
      imageWidth="6rem"
      isSelected={isSelected}
      isVerySelected={isVerySelected}
      rotateAmplitude={12}
      scaleOnHover={1.1}
      showMobileWarning={false}
      showTooltip={true}
      displayOverlayContent={true}
      className="projectCard"
      onMouseEnter={() => {
        changeProject();
      }}
      onMouseLeave={() => {
        resetProject();
      }}
      onClick={() => {
        if (isVerySelected) {
          clearProject();
        } else {
          changeProject(true);
        }
      }}
    />

    // <CardContainer
    //   ref={cardRef}
    //   isHighlighted={isHighlighted}
    //   url={url}
    //   onMouseMove={handleMouseMove}
    //   onMouseLeave={resetTilt}
    //   // onMouseEnter={() => {
    //   //   changeProject(projectComponent);
    //   // }}
    //   // onMouseLeave={() => {
    //   //   resetProject();
    //   // }}
    //   onClick={() => {
    //     changeProject(projectComponent, true);
    //   }}
    // />
  );
};

const CardContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: ${(props) =>
    props.url ? `url(${props.url})` : Colors.ACCENT_SOFT};
  // center the bg
  background-position: center;
  background-size: cover;
  border-radius: 0.5rem;
`;
