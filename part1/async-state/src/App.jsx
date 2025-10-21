/* eslint-disable react/prop-types */
import { useState } from "react";

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {allClicks.join(" ")}</div>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const useClicks = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const [total, setTotal] = useState(0);

  const leftClick = () => {
    setAll(allClicks.concat("L"));
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    setLeft(left + 1);

    setTotal(updatedLeft + right);
  };
  const rightClick = () => {
    setAll(allClicks.concat("R"));
    const updatedRight = right + 1;
    setRight(updatedRight);

    setTotal(left + updatedRight);
  };

  return { leftClick, rightClick, left, right, total, allClicks };
};

const App = () => {
  const clicks = useClicks();

  return (
    <div>
      {clicks.left}
      <Button handleClick={clicks.leftClick} text="left" />
      <Button handleClick={clicks.rightClick} text="right" />
      {clicks.right}
      <History allClicks={clicks.allClicks} />

      <p>total {clicks.total}</p>
    </div>
  );
};

export default App;
