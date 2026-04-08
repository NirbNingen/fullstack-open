import { createContext, useContext, useReducer } from "react";

const BlogsContext = createContext();

export const blogsReducer = (state, action) => {
  console.log(
    `I am reacher the reducer with state: ${JSON.stringify(state)} and the action: ${JSON.stringify(action)}`,
  );
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "INCREASE": {
      const id = action.payload;
      return state.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog,
      );
    }
    case "DELETE": {
      const blogIdToDelete = action.payload;
      return state.filter((blog) => blog.id !== blogIdToDelete);
    }
    default:
      return state;
  }
};

export const useBlogsValue = () => {
  const blogAndDispatch = useContext(BlogsContext);
  return blogAndDispatch[0];
};

export const useBlogsDispatch = () => {
  const blogAndDispatch = useContext(BlogsContext);
  return blogAndDispatch[1];
};

export const BlogsContextProvider = (props) => {
  const [blogs, blogDispatch] = useReducer(blogsReducer, []);
  return (
    <BlogsContext.Provider value={[blogs, blogDispatch]}>
      {props.children}
    </BlogsContext.Provider>
  );
};

export default BlogsContext;
