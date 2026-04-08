import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    increaseLikes(state, action) {
      console.log(
        `action: ${JSON.stringify(action)} & state: ${JSON.stringify(state)}`,
      );
      const id = action.payload;

      return state.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog,
      );
    },
    blogDeletion(state, action) {
      console.log(`Action in blogDeletion: ${JSON.stringify(action)}`);
      const blogIdToDelete = action.payload;
      return state.filter((blog) => blog.id !== blogIdToDelete);
    },
    addBlog(state, action) {
      console.log(`Action: ${JSON.stringify(action)}`);

      const id = action.payload;
      return [...state, action.payload];
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { addBlog, setBlogs, increaseLikes, blogDeletion } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (title) => {
  return async (dispatch) => {
    const newBlog = await blogService.createNew(title);
    console.log(
      `What is the new blog and is it complete? ${JSON.stringify(newBlog)}`,
    );
    dispatch(addBlog(newBlog));
  };
};

export const deleteBlogAction = (selectedBlog) => {
  return async (dispatch) => {
    console.log(`Which ID Am I getting in my reducerHelper: ${selectedBlog}`);
    const id = selectedBlog;

    dispatch(blogDeletion(id));
    blogService.deleteBlog(id);
  };
};

export const addLike = (selectedBlog) => {
  return async (dispatch) => {
    const id = selectedBlog.id;
    const newObject = {
      ...selectedBlog,
      likes: selectedBlog.likes + 1,
    };

    dispatch(increaseLikes(id));
    blogService.addNewLike(id, newObject);
  };
};

export default blogSlice.reducer;
