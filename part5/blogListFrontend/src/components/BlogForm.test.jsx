import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

vi.mock('../services/blogs', () => ({
  default: {
    update: vi.fn(() => Promise.resolve({})),
  },
}))

const blog = {
  title: 'All you ever need to know',
  author: 'Anita Meyers',
  likes: 0,
  url: 'https://anita-meyers.nl',
  user: { name: 'Bertrand Jobse' },
}

beforeEach(() => {
  vi.restoreAllMocks()
})

afterEach(() => {
  document.body.innerHTML = ''
})

test('TEST <BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText(
    'write the title of the blog here',
  )
  const authorInput = screen.getByPlaceholderText(
    'write the author of the blog here',
  )
  const urlInput = screen.getByPlaceholderText('write the url of the blog here')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'Testing Title')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'https://example.com')

  await user.click(sendButton)

  console.log(createBlog.mock.calls)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Testing Title',
    author: 'Test Author',
    url: 'https://example.com',
    likes: 0,
  })
})
