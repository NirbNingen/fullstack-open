import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAnecdotes, newAnecdoteVote } from "./requests";
import { useMessageDispatch } from "./NotificationContext";

const App = () => {
  const dispatch = useMessageDispatch();

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: newAnecdoteVote,
    onSuccess: (anecdoteUpdatedObject) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    newAnecdoteMutation.mutate({ anecdote });
    dispatch({ type: "SET", payload: `anecdote '${anecdote.content}' voted` });

    setTimeout(() => {
      dispatch({
        type: "CLEAR",
        payload: "",
      });
    }, 5000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: true,
    retry: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
