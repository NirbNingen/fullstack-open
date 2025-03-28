const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

usersRouter.get("/", async (request, response) => {
  try {
    const users = await User.find();

    const usersWithBlogs = await Promise.all(
      users.map(async (user) => {
        const blogs = await Blog.find({ "user.id": user.id });
        return {
          id: user.id,
          username: user.username,
          name: user.name,
          blogs: blogs.map((blog) => ({
            id: blog.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes,
          })),
        };
      })
    );

    response.json(usersWithBlogs);
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch users with blogs" });
  }
});

usersRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const user = {
    username: body.username,
    name: body.name,
    passwordHash: body.password,
    notes: body.notes,
  };

  const updatedUser = await User.findByIdAndUpdate(request.params.id, user, {
    new: true,
  });
  response.json(updatedUser);
});

usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    // Validate password length
    if (!password || password.length < 5) {
      return response.status(400).json({
        error: "Password must be at least 5 characters long",
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
      blogs: [],
    });

    const savedUser = await user.save();

    const blogs = await Blog.find({ user: savedUser.id });

    if (blogs && blogs.length > 0) {
      savedUser.blogs = blogs.map((blog) => blog._id);
      await savedUser.save();
    }

    response.status(201).json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
