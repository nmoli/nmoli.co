import styled from "styled-components";
import Colors from "../constants/Colors.js";

const Codeblock = ({ code, ...otherProps }) => {
  return (
    <Container {...otherProps}>
      <pre>
        <code>{code}</code>
      </pre>
    </Container>
  );
};

export default Codeblock;

const Container = styled.div`
  // background-color: #f5f5f5;
  border: 1px solid ${Colors.TEXT_MUTED};
  padding: 0.25rem;
  font-family: Consolas, Monaco, "Courier New", monospace;
  font-size: 0.95em;
  border-radius: 4px;
  // overflow-x: auto;
  // white-space: pre;

  code {
    display: block;
    color: ${Colors.TEXT_MUTED};
  }

  pre {
    margin: 0.25rem 0;
  }
`;
