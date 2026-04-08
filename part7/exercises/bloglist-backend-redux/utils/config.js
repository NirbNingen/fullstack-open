require("dotenv").config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

const MONGODB_USED_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

console.log(`MongoDB URI: ${MONGODB_USED_URI}`);

module.exports = {
  MONGODB_USED_URI,
  PORT,
  NODE_ENV,
};
