const logger = require("./utils/logger");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

// mongoose.connect(config.MONGODB_URI);
// mongoose.set("strictQuery", false);

// if (config.NODE_ENV !== "test") {
//   mongoose.connect(config.MONGODB_URI);
//   mongoose.set("strictQuery", false);
// }
mongoose.connect(config.MONGODB_USED_URI);
mongoose.set("strictQuery", false);

logger.info("middleware:", middleware);

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
// app.use(middleware.userExtractor);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
