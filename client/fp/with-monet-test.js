var expect = require("chai").expect;
var M = require("monet");

describe("with monet", function() {
  it("provides an IO monad", function() {
    expect(M.IO).to.exist;
  });
});
