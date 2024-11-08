/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = ({ handleClicks, text }) => {
  return <button onClick={handleClicks}>{text}</button>;
};

const BestAnecdote = ({ votes, anecdotes }) => {
  const findHighestIndex = (votes) => {
    let maxIndex = null;
    let maxValue = -Infinity;

    for (const key in votes) {
      if (votes[key] > maxValue) {
        maxValue = votes[key];
        maxIndex = key;
      }
    }
    return maxIndex;
  };
  const highestIndex = findHighestIndex(votes);
  return (
    <>
      <h2>Anecdote with the most votes </h2>
      <p>{anecdotes[highestIndex].text}</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    { text: "If it hurts, do it more often.", vote: 0 },
    {
      text: "Adding manpower to a late software project makes it later!",
      vote: 0,
    },
    {
      text: "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      vote: 0,
    },
    {
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      vote: 0,
    },
    { text: "Premature optimization is the root of all evil.", vote: 0 },
    {
      text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      vote: 0,
    },
    {
      text: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      vote: 0,
    },
    { text: "The only way to go fast, is to go well.", vote: 0 },
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(anecdotes.map(() => 0));

  const handleClick = () => {
    setSelected(selected + 1);
  };
  const handleVotes = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    return <h1>Anecdote votes: ${newVotes[selected]}</h1>;
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected].text}</p>
      <p>has {votes[selected]} votes</p>
      <div>
        <Button handleClicks={handleClick} text="next anecdote" />
        <Button handleClicks={handleVotes} text="vote" />
      </div>
      <BestAnecdote votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
