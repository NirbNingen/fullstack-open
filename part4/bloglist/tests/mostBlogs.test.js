const { test, describe } = require("node:test");
const assert = require("node:assert");

const listHelper = require("../utils/list_helper");

const blogs = require("./helpers/blogs");

describe("most blogs", () => {
  test("blog with the most likes", () => {
    const result = listHelper.mostBlogs(blogs);

    const expectedObject = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    assert.deepStrictEqual(result, expectedObject);
    console.log(`Author with most blogs: : ${JSON.stringify(result)}`);
  });
});
