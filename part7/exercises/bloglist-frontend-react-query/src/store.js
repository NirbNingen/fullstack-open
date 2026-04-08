import blogReducer from "./context/blogReducer";
import userReducer from "./context/userReducer";
import notificationReducer from "./context/notificationReducer";
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
