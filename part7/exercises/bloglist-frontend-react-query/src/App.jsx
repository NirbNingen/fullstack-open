import { useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
import BlogView from "./components/BlogView";
import BlogDetail from "./components/BlogDetail";
import Userview from "./components/Userview";
import UserDetail from "./components/UserDetail";
import MenuItem from "./components/MenuItem";
import blogsIcon from "./icons/Paper-Write--Streamline-Ultimate.svg";
import usersIcon from "./icons/Workflow-Teamwork-User-High-Five--Streamline-Ultimate.svg";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useNotify } from "./context/NotificationContext";
import { useUserValue, useUserDispatch } from "./context/UserContext";
import { createBlog, newBlogLike, setToken } from "./requests";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);

  const user = useUserValue();
  const userDispatch = useUserDispatch();
  const notify = useNotify();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      userDispatch({ type: "SET", payload: user });
    }
  }, [userDispatch]);

  const queryClient = useQueryClient();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  const createBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (blogUpdatedObject) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const newBlogLikeMutation = useMutation({
    mutationFn: newBlogLike,
    onSuccess: (blogUpdatedObject) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const addBlog = (blogObject) => {
    try {
      createBlogMutation.mutate({ blogObject });
      notify(`you created '${blogObject.title}'`);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const handleLikes = (id) => {
    const selectedBlog = blogs.find((blog) => blog.id === id);
    console.log(`Selected blog: ${JSON.stringify(selectedBlog)}`);
    newBlogLikeMutation.mutate({ selectedBlog });
    notify(`blog '${selectedBlog.title}' voted`);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setToken(user.token);
      userDispatch({ type: "SET", payload: user });
      notify(`${username} logged in`);

      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("Login failed!");
      notify(`Login failed credentials ${username} incorrect`);
    }
  };

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
          <div>
            <button
              style={{ marginBottom: "15px" }}
              onClick={() => setLoginVisible(false)}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    userDispatch({ type: "CLEAR" });
  };

  const userHasLoggedIn = (user) => {
    return (
      <div>
        {user.name} has logged in {"  "}
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  };

  return (
    <Router>
      <div className="home">
        <h2>blog app</h2>
        <Notification />
        {!user && loginForm()}
        <div>
          <div className="menu">
            <MenuItem linkPath="/blogs" label="blogs" icon={blogsIcon} />
            <MenuItem linkPath="/users" label="users" icon={usersIcon} />
            {user && <MenuItem>{userHasLoggedIn(user)}</MenuItem>}
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                {user && (
                  <div>
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
                          loggedInUser={user?.username || ""}
                          handleLikes={() => handleLikes(blog.id)}
                        />
                      ))}
                </div>
              </div>
            }
          />
          <Route path="/users" element={<Userview blogs={blogs} />} />
          <Route path="/users/:id" element={<UserDetail blogs={blogs} />} />
          <Route path="/blogs" element={<BlogView blogs={blogs} />} />
          <Route
            path="/blogs/:id"
            element={<BlogDetail blogs={blogs} handleLikes={handleLikes} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
