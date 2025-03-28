const { test, beforeEach, describe, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);

const helper = require("./test_helper");
const Blog = require("../models/blog");
const authForTesting = require("./helpers/authentication");

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("clear");
  await Blog.insertMany(helper.initialBlogs);
  console.log("inserting");
});

describe("Validate GET requests", (async) => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("the database returns the expected number of blogs", async () => {
    const response = await api.get("/api/blogs");
    assert(helper.initialBlogs.length === response.body.length);
  });

  test("ensure unique id is called id", async () => {
    const response = await api.get("/api/blogs");
    response.body.map((blog) => {
      assert(blog.id);
    });
  });
});

describe("Validate POST requests", (async, token) => {
  test("POST method increases the amount of blogs", async () => {
    const payload = {
      title: "Most beautiful blog ever, for real",
      author: "Marijke Lust",
      url: "https://somewhere.com",
      likes: 6,
      userId: "67dd6bd3c385cdfe22fb0a7f",
    };
    console.log(`Blogs before post request: ${helper.initialBlogs.length}`);

    const token = await authForTesting();

    const initialResponse = await api
      .post("/api/blogs")
      .send(payload)
      .set("Authorization", `Bearer ${token}`);
    console.log(`Repsonse from post call: ${JSON.stringify(initialResponse)}`);
    const response = await api.get("/api/blogs");
    assert(response.body.length === helper.initialBlogs.length + 1);
  });

  test("verify if the likes property is missing from the request", async () => {
    const payload = {
      title: "Most beautiful blog ever",
      author: "Henri Fantatik",
      url: "https://somewhere.com",
    };

    const token = await authForTesting();

    const response = await api
      .post("/api/blogs")
      .send(payload)
      .set("Authorization", `Bearer ${token}`);
    const errorMessage = JSON.parse(response.text).error;

    assert(
      errorMessage ===
        "Blog validation failed: likes: Path `likes` is required."
    );
  });

  test("verify if the title or url properties are missing from the request", async () => {
    const payloadArray = [
      {
        author: "Henri Fantatik",
        url: "https://somewhere.com",
        likes: 6,
      },
      {
        title: "Blessed to be alive",
        author: "Henri Fantatik",
        likes: 6,
      },
    ];

    const token = await authForTesting();

    payloadArray.map(async (payload) => {
      const response = await api
        .post("/api/blogs")
        .send(payload)
        .set("Authorization", `Bearer ${token}`);
      assert(response.status === 400);
    });
  });
});
describe("Verify DELETE requests", (async) => {
  test("Blog cannot be deleted from the database with unauthenticated user", async () => {
    const token = await authForTesting();
    const response = await api.get("/api/blogs");
    const id = response.text.id;
    const deleteResponse = await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `Bearer ${token}`);
    assert(deleteResponse.status === 401);
  });

  test("Blogs can be deleted with authenticated user", async () => {
    const payload = {
      title: "Personal fotos for Hermans eyes only",
      author: "Marijke Lust",
      url: "https://somewhere.com",
      likes: 6,
      userId: "67dd6bd3c385cdfe22fb0a7f",
    };
    const token = await authForTesting();
    const initialResponse = await api
      .post("/api/blogs")
      .send(payload)
      .set("Authorization", `Bearer ${token}`);
    console.log(`Repsonse from post call: ${JSON.stringify(initialResponse)}`);

    const id = JSON.parse(initialResponse.text).id;

    const deleteResponse = await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `Bearer ${token}`);
    assert(deleteResponse.status === 204);
  });
});

describe("Verify PUT requests", (async) => {
  test("Notes can be updated to the database", async () => {
    const response = await api.get("/api/blogs");
    const id = JSON.parse(response.text)[0].id;
    payload = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 17,
    };
    const updateResponse = await api.put(`/api/blogs/${id}`).send(payload);
    assert(updateResponse.status === 200);
  });
});

after(async () => {
  await mongoose.connection.close();
});
