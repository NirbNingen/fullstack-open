const { test, describe } = require("node:test");
const assert = require("node:assert");
const average = require("../utils/for_testing").average;

const listHelper = require("../utils/list_helper");

const blogs = require("./helpers/blogs");

test("of empty array is zero", () => {
  assert.strictEqual(average([]), 0);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.likesWithOneBlog(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("total likes should equal 36", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 36);
  });
});

