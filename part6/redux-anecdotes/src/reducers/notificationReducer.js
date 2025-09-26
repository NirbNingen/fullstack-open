import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "setNotification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    emptyNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification, emptyNotification } = notificationSlice.actions;

export const addNotification = (incomingNotification, timeOut) => {
  console.log(
    `Am I reaching here from the note creation? with anecdote: ${incomingNotification}`
  );
  const miliseconds = timeOut * 1000;
  return async (dispatch) => {
    dispatch(setNotification(incomingNotification));

    setTimeout(() => {
      dispatch(emptyNotification(""));
    }, miliseconds);
  };
};

export default notificationSlice.reducer;
