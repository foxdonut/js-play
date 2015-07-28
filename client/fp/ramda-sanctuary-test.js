var expect = require("chai").expect;
var code = require("./ramda-sanctuary");

var R = require("ramda");
var S = require("sanctuary");

describe("ramda-sanctuary", function() {
  describe("Maybe", function() {
    it("creates a Maybe from a value", function() {
      expect(S.Maybe.of(42)).to.deep.equal(S.Just(42));
    });

    it("creates a Nothing from null/undefined", function() {
      expect(S.toMaybe(R.prop("foo")({bar:"baz"}))).to.deep.equal(S.Nothing());
    });
  });
});
