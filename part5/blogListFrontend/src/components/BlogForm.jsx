import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: 0,
    })
    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  const handleBlogChange = (value, fieldName) => {
    switch (fieldName) {
      case 'title':
        setNewBlog({ ...newBlog, title: value })
        break
      case 'author':
        setNewBlog({ ...newBlog, author: value })
        break
      case 'url':
        setNewBlog({ ...newBlog, url: value })
        break
    }
    console.log(`newBlog: ${JSON.stringify(newBlog)}`)
  }

  return (
    <>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            id="title"
            type="text"
            name="title"
            onChange={(event) =>
              handleBlogChange(event.target.value, event.target.name)
            }
            value={newBlog.title}
            placeholder="write the title of the blog here"
          />
        </div>
        <div>
          author
          <input
            id="author"
            type="text"
            name="author"
            onChange={(event) =>
              handleBlogChange(event.target.value, event.target.name)
            }
            value={newBlog.author}
            placeholder="write the author of the blog here"
          />
        </div>
        <div>
          url
          <input
            id="url"
            type="text"
            name="url"
            onChange={(event) =>
              handleBlogChange(event.target.value, event.target.name)
            }
            value={newBlog.url}
            placeholder="write the url of the blog here"
          />
        </div>
        <button id="create-blog" type="submit">
          create
        </button>
      </form>
    </>
  )
}
BlogForm.displayName = 'BlogForm'

export default BlogForm
