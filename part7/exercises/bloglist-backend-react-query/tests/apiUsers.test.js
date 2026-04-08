const { test, beforeEach, describe, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);

const helper = require("./test_helper");
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});
  console.log("clear");
  console.log(`Hello helper users: ${JSON.stringify(helper.initialUsers)}`);
  const resp = await User.insertMany(helper.initialUsers);
  console.log(`inserting response: ${JSON.stringify(resp)}`);
});

describe("POST request validation", (async) => {
  test("hello", (async) => {
    assert(1 === 1);
  });
  test("an invalid user can not be created", async (async) => {
    const tokenResponse = await api.post("/api/login").send({
      username: "justmarijke",
      password: "jageheimhoor",
    });
    const token = JSON.parse(tokenResponse.text).token;

    const invalidPayloads = [
      {
        username: "marianne78",
        name: "Marianne Verbroek",
        password: "12",
      },
      {
        username: "marianne54",
        name: "Ma",
        password: "12345",
      },
      {
        username: "ma",
        name: "Marianne VerJurk",
        password: "er",
      },
    ];
    invalidPayloads.map(async (payload) => {
      const response = await api
        .post("/api/users")
        .send(payload)
        .set("Authorization", `Bearer ${token}`);
      assert(response.status === 400);
    });
  });
});

// describe("Validate GET requests", (async) => {
//   test("blogs are returned as json", async () => {
//     await api
//       .get("/api/blogs")
//       .expect(200)
//       .expect("Content-Type", /application\/json/);
//   });

//   test("the database returns the expected number of blogs", async () => {
//     const response = await api.get("/api/blogs");
//     assert(helper.initialBlogs.length === response.body.length);
//   });
// });
