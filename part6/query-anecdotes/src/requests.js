import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = async (newAnecdote) => {
  console.log(`newAnecdote: ${JSON.stringify(newAnecdote)}`);
  if (newAnecdote.content.length > 5) {
    console.log("am I somehow passing the chars is longer then 5? ");
    return axios.post(baseUrl, newAnecdote).then((res) => res.data);
  } else {
    console.log("Anecdote content is too short.");
    return Promise.reject(new Error("Anecdote content is too short."));
  }
};

export const newAnecdoteVote = async (newObject) => {
  console.log(
    `Object coming into the request before transformation: ${JSON.stringify(
      newObject
    )}`
  );
  const id = newObject.anecdote.id;
  const currentVotes = newObject.anecdote.votes;
  const increaseVotes = currentVotes + 1;
  console.log(`Current votes: ${currentVotes}`);
  newObject = { ...newObject.anecdote, votes: increaseVotes };
  console.log(`New object: ${JSON.stringify(newObject)}`);

  return axios.put(`${baseUrl}/${id}`, newObject).then((res) => res.data);
};
