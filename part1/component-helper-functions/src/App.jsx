import { useState } from "react";

const Hello = (props) => {
  const { name, age, counter, dropper } = props;
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {counter} years old
      </p>
      <p>So you were probably born in {dropper}</p>
    </div>
  );
};

const Display = (props) => {
  return <div>{props.counter}</div>;
};

const App = (props) => {
  const [counter, setCounter] = useState(0);
  const [dropper, setDropper] = useState(2024);
  const name = "Peter";
  const age = 10;

  setTimeout(() => setCounter(counter + 7), 1000);
  setTimeout(() => setDropper(dropper - 7), 1000);

  const handleClick = () => {
    console.log("clicked", { counter, dropper });
    setCounter(0);
    setDropper(2024);
  };

  return (
    <>
      <div>
        <Hello name={name} age={age} counter={counter} dropper={dropper} />
        <button onClick={handleClick}>Reset Peter's age</button>
      </div>
    </>
  );
};

export default App;
