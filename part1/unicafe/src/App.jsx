/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const StatisticsLine = ({ text, value, additional }) => {
  return (
    <div>
      {text}: {value}
      {additional}
    </div>
  );
};

const Statistics = ({ goodTotal, neutralTotal, badTotal }) => {
  const total = goodTotal + neutralTotal + badTotal;
  const average = total / 3;
  const postitiveRatio = (goodTotal / total) * 100;
  if (total == 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <StatisticsLine text="good" value={goodTotal} />
      <StatisticsLine text="neutral" value={neutralTotal} />
      <StatisticsLine text="bad" value={badTotal} />
      <h1>statistics</h1>
      <StatisticsLine text="total" value={total} />
      <StatisticsLine text="average" value={Math.round(average * 10) / 10} />
      <StatisticsLine
        text="positive"
        value={Math.round(postitiveRatio * 10) / 10}
        additional="%"
      />
    </div>
  );
};

const App = () => {
  const [goodClicks, setGoodClicks] = useState(0);
  const [goodTotal, setGoodTotal] = useState(0);

  const [neutralClicks, setNeutralClicks] = useState(0);
  const [neutralTotal, setNeutralTotal] = useState(0);

  const [badClicks, setBadClicks] = useState(0);
  const [badTotal, setBadTotal] = useState(0);

  // const total = goodTotal + neutralTotal + badTotal;
  // const stats = { total: "", average: "" };

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

  return (
    <div>
      <h1>feedback</h1>
      <Button handleClick={handleClicksGood} text={"good"} />
      <Button handleClick={handleClicksNeutral} text={"neutral"} />
      <Button handleClick={handleClicksBad} text={"bad"} />
      <Statistics
        goodTotal={goodTotal}
        neutralTotal={neutralTotal}
        badTotal={badTotal}
      ></Statistics>
    </div>
  );
};

export default App;
