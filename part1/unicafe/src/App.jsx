import { useState } from "react";

// const Button = ({ handleClick, text }) => {
//   return (
//     <>
//       <button onClick={handleClick}>{text}</button>
//     </>
//   );
// };

// const App = () => {
//   // const [goodClicks, setGoodClicks] = useState(0);
//   // const [goodTotal, setGoodTotal] = useState(0);

  // const [clicks, setClicks] = useState({ good: 10, neutral: 0, bad: 0 });
//   const [total, setTotal] = useState({ good: 0, neutral:0, bad: 0});

//   // Expected output: Array ["a", "b", "c"]


//   const newClickHandler = (type) => {
//     switch (type) {
//       case "good":
//         debugger;
//         console.log("I reached here");
//         setClicks(clicks.good++);
//         setTotal(t++);
//     }
// const newClickHandler = (type) => {
    // console.log(clicks.type);
    // console.log(clicks[type]);
    // console.log(`good comes into the handler `);
    // console.log(`clicks: ${clicks[0].type}`);
    // console.log(clicks[`${type}`]);
//     // console.log(` hardcoded good: ${clicks["good"]}`);
//     // console.log(clicks[`${type}`]);
//     // setClicks(clicks[`${type}`] + 1);
//     // console.log(typeof clicks[type]);
//     // setClicks(clicks[type] + 1);
//     // console.log("clicks after increase:", clicks[`${type}`]);
    // setTotal[type] = clicks[`${type}`] + 1;
//     // console.log(total[type]);
//   };

//   //   const clickHandler = (type) => {
//   //     setClicks(clicks.type + 1);
//   //     setTotal(clicks.type + 1);
//   //     console.log({ type });
//   //   };

//   return (
//     <div>
//       <h1>feedback</h1>
//       {/* <p>{clicks.good}</p> */}
//       {/* <Button handleClick={handleClicks} text={"good"} /> */}
//       <Button handleClick={() => newClickHandler("good")} text="good" />
//       {/* <Button handleClick={handleClicksNeutral} text={"neutral"} />
//       <Button handleClick={handleClicksBad} text={"bad"} />  */}
//       <h1>statistics</h1>
//       <p>Good: {total.good}</p>
//       {/* <p>Neutral: {neutralTotal}</p>
//       <p>Bad: {badTotal}</p> */}
//     </div>
//   );
// };

// export default App;

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const App = () => {
  const [goodClicks, setGoodClicks] = useState(0);
  const [goodTotal, setGoodTotal] = useState(0);

  const [neutralClicks, setNeutralClicks] = useState(0);
  const [neutralTotal, setNeutralTotal] = useState(0);

  const [badClicks, setBadClicks] = useState(0);
  const [badTotal, setBadTotal] = useState(0);

  const total = goodTotal + neutralTotal + badTotal;

  const handleClicksGood = () => {
    setGoodClicks(goodClicks + 1);
    setGoodTotal(goodClicks + 1);
    console.log("Good");
    console.log(goodClicks);
  };

  const handleClicksNeutral = () => {
    setNeutralClicks(neutralClicks + 1);
    setNeutralTotal(neutralClicks + 1);
    console.log("Neutral");
    console.log(neutralClicks);
  };

  const handleClicksBad = () => {
    setBadClicks(badClicks + 1);
    setBadTotal(badClicks + 1);
    console.log("Bad");
    console.log(badClicks);
  };

  const Statistics = ({good}) => {
    const total = goodTotal + neutralTotal + badTotal;

  }

  return (
    <div>
      <h1>feedback</h1>
      <Button handleClick={handleClicksGood} text={"good"} />
      <Button handleClick={handleClicksNeutral} text={"neutral"} />
      <Button handleClick={handleClicksBad} text={"bad"} />
      <h1>statistics</h1>
      <p>good: {goodTotal}</p>
      <p>neutral: {neutralTotal}</p>
      <p>bad: {badTotal}</p>
      <p>all: {total}</p>
      <p>average: {total / 3}</p>
    </div>
  );
};

export default App;
