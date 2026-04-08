import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
import { initializeBlogs, addLike, createBlog } from "./reducers/blogReducer";
import { loginUser, initializeUser, logoutUser } from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "./reducers/notificationReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  // const loggedInUserBoolean = useSelector((state) => state.loggedInUser);
  const notification = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  // console.log(`Blogs: ${JSON.stringify(blogs)}`);

  const loggedInUser = window.localStorage.getItem("loggedBlogappUser");

  useEffect(() => {
    dispatch(initializeBlogs(loggedInUser));
  }, [dispatch]);

  const addBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject));
      dispatch(addNotification(`you created '${blogObject.title}'`));
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const handleLikes = (id) => {
    const selectedBlog = blogs.find((blog) => blog.id === id);
    dispatch(addLike(selectedBlog));
    dispatch(addNotification(`you voted '${selectedBlog.title}'`));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(loginUser(username, password));
      dispatch(addNotification(`${username} logged in `));
    } catch (exception) {
      console.log(`Ow no!`);
    }
  };
  const loggedInBlogUser = username;

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const userHasLoggedIn = (user) => {
    return (
      <>
        <div>
          {user.name} has logged in
          <button onClick={handleLogout}>logout</button>
        </div>

        <br />
      </>
    );
  };

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification message={notification} />
      </div>

      {!user && loginForm()}
      {user && (
        <div>
          <p>{userHasLoggedIn(user)}</p>
          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}

      <div>
        {user &&
          [...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                loggedInUser={loggedInBlogUser || ""}
                handleLikes={() => handleLikes(blog.id)}
              />
            ))}
      </div>
    </div>
  );
};

export default App;
