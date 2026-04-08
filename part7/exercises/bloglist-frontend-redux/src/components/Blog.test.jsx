import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

test('TEST renders content', async () => {
  render(<Blog blog={blog} />)
  // screen.debug()

  const titleElements = await screen.findAllByText(
    /All you ever need to know\s*-\s*Anita Meyers/i,
  )
  expect(titleElements.length).toBeGreaterThan(0)

  const likesElement = screen.queryByText('0')
  const urlElement = screen.queryByText('https://anita-meyers.nl')

  expect(likesElement).not.toBeVisible()
  expect(urlElement).not.toBeVisible()
})

test('TEST renders content and toggles visibility', async () => {
  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const toggleButton = screen.getByText('view')

  expect(toggleButton).toBeDefined()
  await user.click(toggleButton)

  const urlElement = await screen.findByText(blog.url)
  expect(urlElement).toBeVisible()

  screen.debug()

  const likesElement = await screen.findByText((content) =>
    content.includes('0'),
  )
  await screen.findByText('https://anita-meyers.nl')
  expect(likesElement).toBeDefined()
})

test("TEST calls handleLikes function when clicking 'like'", async () => {
  const mockHandleLikes = vi.fn()
  const mockSetShouldFetch = vi.fn()
  const user = userEvent.setup()

  render(
    <Blog
      blog={blog}
      handleLikes={mockHandleLikes}
      setShouldFetch={mockSetShouldFetch}
    />,
  )
  const likeButton = await screen.findByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandleLikes).toHaveBeenCalledTimes(2)
  expect(mockHandleLikes).toHaveBeenCalledWith(blog)
})
