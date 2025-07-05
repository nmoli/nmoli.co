import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="nameContainer">
        <span className="red">N</span>ick <span className="red">M</span>olinari
      </div>
      <div>I like building cool things.</div>
      <div>
        I like interfacing with new technologies, I like hard logic and
        optimization problems, I like algorithms.
      </div>
      <div>
        I can be interested in pretty much anything if you give me a large
        complicated problem and let me chew through it.
      </div>
    </>
  );
}

export default App;
