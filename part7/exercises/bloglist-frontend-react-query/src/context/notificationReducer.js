import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "setNotification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    emptyNotification(state, action) {
      return "";
    },
  },
});

export const { setNotification, emptyNotification } = notificationSlice.actions;

export const addNotification = (incomingNotification) => {
  console.log(
    `Am I reaching here from the notification creation? with blog: ${incomingNotification}`,
  );
  return async (dispatch) => {
    dispatch(setNotification(incomingNotification));

    setTimeout(() => {
      dispatch(emptyNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
