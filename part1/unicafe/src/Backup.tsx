// import { useState } from "react";

// const Button = ({ handleClick, text }) => {
//   return (
//     <>
//       <button onClick={handleClick}>{text}</button>
//     </>
//   );
// };

// const BackupApp = () => {
//   const [goodClicks, setGoodClicks] = useState(0);
//   const [goodTotal, setGoodTotal] = useState(0);

//   const [neutralClicks, setNeutralClicks] = useState(0);
//   const [neutralTotal, setNeutralTotal] = useState(0);

//   const [badClicks, setBadClicks] = useState(0);
//   const [badTotal, setBadTotal] = useState(0);

//   const handleClicks = () => {
//     setGoodClicks(goodClicks + 1);
//     setGoodTotal(goodClicks + 1);
//     console.log("Good");
//     console.log(goodClicks);
//   };

//   const handleClicksNeutral = () => {
//     setNeutralClicks(neutralClicks + 1);
//     setNeutralTotal(neutralClicks + 1);
//     console.log("Neutral");
//     console.log(neutralClicks);
//   };

//   const handleClicksBad = () => {
//     setBadClicks(badClicks + 1);
//     setBadTotal(badClicks + 1);
//     console.log("Bad");
//     console.log(badClicks);
//   };

//   return (
//     <div>
//       <h1>feedback</h1>
//       <Button handleClick={handleClicks} text={"good"} />
//       <Button handleClick={handleClicksNeutral} text={"neutral"} />
//       <Button handleClick={handleClicksBad} text={"bad"} />
//       <h1>statistics</h1>
//       <p>Good: {goodTotal}</p>
//       <p>Neutral: {neutralTotal}</p>
//       <p>Bad: {badTotal}</p>
//     </div>
//   );
// };

// export default BackupApp;
