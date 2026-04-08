import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login"; // Fix: should be login service, not blog
import blogService from "../services/blogs"; // Fix: should be blogs, not blog

const userSlice = createSlice({
  name: "user", // Fix: should be "user", not "users" for single user state
  initialState: null, // Fix: should be null for single user, not array
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      return user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
};

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    dispatch(clearUser());
  };
};

export default userSlice.reducer;
