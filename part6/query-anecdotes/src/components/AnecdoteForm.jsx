/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useMessageDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const dispatch = useMessageDispatch();

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      dispatch({
        type: "SET",
        payload: `anecdote ${newAnecdote.content} created`,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR", payload: "" });
      }, 5000);
    },
  });

  const addAnecdoteInput = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    if (content.length < 5) {
      dispatch({
        type: "SET",
        payload: "too short anecdote, must have length 5 or more",
      });
      return;
    }

    newAnecdoteMutation.mutate({ content, votes: 0 });
    console.log(content);
    event.target.anecdote.value = "";
    console.log("new anecdote");
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdoteInput}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
