import Togglable from './Toggleable'
import { useState } from 'react'
import blogService from './../services/blogs'

const Blog = ({ blog, loggedInUser, setShouldFetch, handleLikes }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const deleteBlog = async (title, id) => {
    const text = `Do you want to delete ${title} ?`
    const userConfirmed = confirm(text)

    try {
      if (userConfirmed) {
        console.log(`${title} has been deleted.`)
        const response = await blogService.deleteBlog(id)
        setShouldFetch(true)
      } else {
        console.log(`User does not want to delete ${title}`)
      }
    } catch (error) {
      console.log(`Blog could not be deleted due to: ${error}`)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="blog">
        <>
          {blog.title} - {blog.author}
        </>
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={showWhenVisible}>
        <div>
          {blog.title} - {blog.author}{' '}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button
            id="like-button"
            onClick={() => {
              console.log('Like button clicked!')
              handleLikes(blog)
            }}
          >
            like
          </button>
          {console.log('handleLikes function reference:', handleLikes)}
        </div>
        {/* {console.log(
          `blog.user.username: ${blog.user.name} loggedInUser: ${loggedInUser}`,
        )} */}
        {blog.user.name === loggedInUser && (
          <button
            id="remove-button"
            onClick={() => deleteBlog(blog.title, blog.id)}
          >
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
