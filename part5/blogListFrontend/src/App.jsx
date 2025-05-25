import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggleable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [shouldFetch, setShouldFetch] = useState(true)

  const blogFormRef = useRef()

  useEffect(() => {
    if (shouldFetch) {
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
    setShouldFetch(false)
  }, [shouldFetch])

  console.log(`Blogs: ${JSON.stringify(blogs)}`)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      console.log('Created blog:', returnedBlog) // Debugging step
      setBlogs((prevBlogs) => [...prevBlogs, returnedBlog]) // Update state immediately
      setShouldFetch(true)
      setMessage(
        `A new blog "${blogObject.title}" by ${blogObject.author} has been added.`,
      )
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      console.error('Error creating blog:', error)
    }
  }
  const handleLikes = async (blog) => {
    const newObject = {
      ...blog,
      likes: blog.likes + 1,
    }
    try {
      const response = await blogService.update(blog.id, newObject)
      setShouldFetch(true)
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      console.log(`user: ${user}`)
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

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
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const userHasLoggedIn = (user) => {
    return (
      <>
        <div>
          {user.name} has logged in
          <button onClick={handleLogout}>logout</button>
        </div>

        <br />
      </>
    )
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification message={message} />
      </div>

      {!user && loginForm()}
      {user && (
        <div>
          <p>{userHasLoggedIn(user)}</p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} setShouldFetch={setShouldFetch} />
          </Togglable>
        </div>
      )}

      <div>
        {user &&
          blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                loggedInUser={user?.name || ''}
                setShouldFetch={setShouldFetch}
                handleLikes={handleLikes}
              />
            ))}
      </div>
    </div>
  )
}

export default App
