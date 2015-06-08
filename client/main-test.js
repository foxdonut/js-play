var expect = require("chai").expect;
var main = require("./main.es6");

describe("es6", function() {
  describe("generators", function() {
    it("yields and resumes", function() {
      var iter1 = main.iter1;
      var it = main.iter1(5);

      // iter1 has 2 yields, so we call next() 3 times.
      // the first call to next() takes no value, else it is ignored.
      expect(it.next()).to.deep.equal({value: 6, done: false});
      expect(it.next(15)).to.deep.equal({value: 10, done: false});

      // the last time is the return value of the function.
      // x = 5, y = 30, z = 7
      expect(it.next(7)).to.deep.equal({value: 42, done: true});

      // calling next() after we're already done gives undefined value.
      expect(it.next()).to.deep.equal({value: undefined, done: true});
    });
  });
});
