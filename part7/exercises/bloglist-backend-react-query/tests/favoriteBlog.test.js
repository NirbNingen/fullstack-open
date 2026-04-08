const { test, describe } = require("node:test");
const assert = require("node:assert");

const listHelper = require("../utils/list_helper");

const blogs = require("./helpers/blogs");

describe("favorite blog", () => {
  test("blog with the most likes", () => {
    const result = listHelper.favoriteBlog(blogs);

    assert.strictEqual(Array.isArray(result), false, "The object is an array");

    const expectedObject = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    assert.deepStrictEqual(result, expectedObject);

    console.log(`result: ${JSON.stringify(result)}`);
  });

  test("author with the most likes", () => {
    const result = listHelper.mostLikes(blogs);
    const expectedObject = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };
    assert.deepStrictEqual(result, expectedObject);
  });
});
