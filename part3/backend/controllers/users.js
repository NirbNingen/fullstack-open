const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("notes", {
    content: 1,
    important: 1,
  });
  response.json(users);
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

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
