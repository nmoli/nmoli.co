import styled from "styled-components";
import Colors from "../constants/Colors.js";

export default Text = ({ children, className, size, color, ...otherProps }) => {
  return (
    <Container className={className} color={color} size={size} {...otherProps}>
      {children}
    </Container>
  );
};

const Container = styled.div`
  color: ${(props) =>
    props.color || Colors.TEXT_PRIMARY}; /* Default light text color */
  font-size: ${(props) => props.size || "16px"}; /* Default font size */
  font-decoration: none; /* No underline by default */
`;
