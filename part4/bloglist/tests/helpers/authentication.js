const supertest = require("supertest");
const app = require("../../app");
const api = supertest(app);

const authForTesting = async () => {
  const tokenResponse = await api.post("/api/login").send({
    username: "justmarijke",
    password: "jageheimhoor",
  });
  const token = JSON.parse(tokenResponse.text).token;
  console.log(`TOKEN: ${token}`);
  return token;
};

module.exports = authForTesting;
