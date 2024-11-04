import { useState } from "react";

const SubComponent = () => {
  const test = "Hello from subComponent";
  return test;
};

const NewHeader = ({ index }) => {
  return (
    <div>
      <h1>Hi There gorgeous {index}</h1>
    </div>
  );
};

const App = () => {
  const [header, setHeader] = useState(false);
  const [click, totalClicks] = useState(0);

  const handleOnClick = () => {
    console.log(header);
    setHeader(!header);
    totalClicks(click + 1);
    console.log(click);
  };

  return (
    <div>
      <h1>
        <SubComponent />
      </h1>
      <button onClick={handleOnClick} style={{ fontSize: 50 }}>
        I AM A BUTTON
      </button>
      {header ? <NewHeader /> : <></>}
    </div>
  );
};

export default App;
