import styled from "styled-components";
import Colors from "../constants/Colors";
import SampleProject from "./projects/SampleProject";
import { useEffect, useRef, useState } from "react";
import TiltedCard from "../components/TiltedCard";
import Stroll from "./projects/Stroll";
import EcoLogical from "./projects/EcoLogical";
import SQC from "./projects/SQC";
import StarBubble from "./projects/StarBubble";
import DogeChat from "./projects/DogeChat";

const ProjectsGrid = ({ selectedProject, setSelectedProject, projects }) => {
  return (
    <Container>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          isSelected={selectedProject?.name === project.name}
          setSelectedProject={() => setSelectedProject(project)}
        />
      ))}
    </Container>
  );
};

export default ProjectsGrid;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 6rem);
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;

  .projectCard {
    cursor: pointer;
    margin: 0;
  }
`;

const ProjectCard = ({ project, isSelected, setSelectedProject }) => {
  // console.log("Project", project.name, isSelected);

  return (
    <TiltedCard
      imageSrc={project.url}
      containerHeight="6rem"
      containerWidth="6rem"
      imageHeight="6rem"
      imageWidth="6rem"
      isSelected={isSelected}
      rotateAmplitude={12}
      scaleOnHover={1.1}
      showMobileWarning={false}
      showTooltip={true}
      displayOverlayContent={true}
      className="projectCard"
      onMouseEnter={() => {
        setSelectedProject(project);
      }}
      onMouseLeave={() => {
        // resetProject();
      }}
      onClick={() => {
        setSelectedProject(project);
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
