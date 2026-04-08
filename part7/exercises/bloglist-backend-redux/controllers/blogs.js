const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find();
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const { title, author, url, likes } = request.body;
  Blog.findById(request.params.id)
    .then((blog) => {
      if (!blog) {
        return response.status(404).end();
      }
      blog.title = title;
      blog.author = author;
      blog.url = url;
      blog.likes = likes;

      return blog.save().then((updatedBlog) => {
        response.json(updatedBlog);
      });
    })
    .catch((error) => next(error));
});

blogRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body;
    const user = request.user;

    if (!user) {
      return response
        .status(401)
        .json({ error: "Unauthorized: No user found" });
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: {
        username: user.username,
        id: user.id,
        name: user.name,
      },
    });
    try {
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();

      response.status(201).json(savedBlog);
    } catch (exception) {
      next(exception);
    }
  }
);

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;

    if (user?.blogs.includes(request.params.id)) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      return response.status(401).end();
    }
  }
);

module.exports = blogRouter;
