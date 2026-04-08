import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    loggedInUser: userReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

export default store;
