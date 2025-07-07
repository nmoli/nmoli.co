import React from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/styles/overlayscrollbars.css";

const DebugScroll = () => (
  <OverlayScrollbarsComponent
    options={{ scrollbars: { autoHide: "never" } }}
    // style={{
    //   height: "70vh",
    //   width: "600px",
    //   margin: "50px auto",
    //   border: "1px solid #ccc",
    // }}
  >
    <div
      style={{
        height: "200vh",
        background: "linear-gradient(#f00, #0f0)",
      }}
    >
      Scrolling test content
      <br />
      Keep scrolling...
    </div>
  </OverlayScrollbarsComponent>
);

export default DebugScroll;
