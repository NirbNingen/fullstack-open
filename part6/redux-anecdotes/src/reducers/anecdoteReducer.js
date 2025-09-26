import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    increaseVote(state, action) {
      const updatedAnecdote = action.payload;

      return state.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
    },
    addAnecdote(state, action) {
      console.log(`Action: ${JSON.stringify(action)}`);
      return [
        ...state,
        {
          id: action.payload.id,
          content: action.payload.content,
          votes: action.payload.votes,
        },
      ];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { increaseVote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    console.log(
      `What is the new anecdote and is it comp0lete? ${JSON.stringify(
        newAnecdote
      )}`
    );
    dispatch(addAnecdote(newAnecdote));
  };
};

export const addVote = (selectedAnecdote) => {
  return async (dispatch) => {
    dispatch(increaseVote(selectedAnecdote));
    const id = selectedAnecdote.id;
    const newObject = {
      ...selectedAnecdote,
      votes: selectedAnecdote.votes + 1,
    };

    dispatch(increaseVote(newObject));
    anecdoteService.addVote(id, newObject);
  };
};

export default anecdoteSlice.reducer;
