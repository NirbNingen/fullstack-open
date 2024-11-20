/* eslint-disable react/prop-types */
// import { useState } from "react";

const Reducer = ({ array }) => {
  const sumOfAll = array.reduce((a, b) => a + b, 0);
  const numberString = array.join(" + ");
  return (
    <div>
      <p>Here I will calculate the total of all numbers:</p>
      <>
        {numberString} = {sumOfAll}
      </>
    </div>
  );
};

const Mapper = ({ array }) => {
  return (
    <div>
      <p>Here I will print a pointed list of my items: </p>
      <p>
        {array.map((item, index) => (
          <>
            <Item item={item} index={index} />
          </>
        ))}
      </p>
    </div>
  );
};

const Item = ({ item, index }) => {
  const colors = ["blue", "pink", "orange", "yellow", "purple"];
  const color = colors[index % colors.length];
  return (
    <>
      <p style={{ color: color }}>{item}</p>
    </>
  );
};

const App = () => {
  const things = ["Spiders", "Tigers", "Pistace", "Vanilla", "Purple"];
  const numbers = [23, 54, 56, 7, 98, 123];

  return (
    <div
      style={{
        fontFamily: "arial",
      }}
    >
      <h1>Test Page</h1>
      {console.log(things, numbers)}
      <Reducer array={numbers} />
      <Mapper array={things} />

      <br />
    </div>
  );
};

export default App;
