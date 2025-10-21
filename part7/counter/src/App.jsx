import { useState } from "react";
import "./App.css";

const App = () => {
  const useCounter = () => {
    const [value, setValue] = useState(0);

    const increase = () => {
      setValue(value + 1);
    };

    const decrease = () => {
      setValue(value - 1);
    };

    const zero = () => {
      setValue(0);
    };

    return { increase, decrease, zero, value };
  };

  const counter = useCounter();

  return (
    <div>
      <div>{counter.value}</div>
      <button onClick={counter.increase}>plus</button>
      <button onClick={counter.decrease}>minus</button>
      <button onClick={counter.zero}>zero</button>
    </div>
  );
};

export default App;
