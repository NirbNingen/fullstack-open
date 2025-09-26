import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { addNotification } from "../reducers/notificationReducer";

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    const selectedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(addNotification(`you voted '${selectedAnecdote.content}'`, 10));
    dispatch(addVote(selectedAnecdote));
  };

  return (
    <>
      {anecdotes
        .filter((obj) => {
          if (!filter) {
            return true;
          }
          return (
            obj.content &&
            typeof obj.content === "string" &&
            obj.content.toLowerCase().includes(filter.toLowerCase())
          );
        })
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};
