import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { addNotification } from "../reducers/notificationReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdoteInput = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(addNotification(`You created a new anecdote!: ${content}`, 10));
    dispatch(createAnecdote(content));
    event.target.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdoteInput}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
