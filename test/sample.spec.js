const hello = require("../sample");

describe("hello function", () => {
  it("concatenate hello and strings", () => {
    const actual = hello("World");
    const expected = "Hello World";

    expect(actual).toBe(expected);
  });
});
