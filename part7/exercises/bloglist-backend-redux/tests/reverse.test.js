const { test } = require("node:test");
const { strictEqual } = require("node:assert");
const reverse = require("../utils/for_testing").reverse;

test("reverse of a", () => {
  const result = reverse("a");

  strictEqual(result, "a");
});

test("reverse of react", () => {
  const result = reverse("react");

  strictEqual(result, "tcaer");
});

test("reverse of saippuakauppias", () => {
  const result = reverse("saippuakauppias");

  strictEqual(result, "saippuakauppias");
});
