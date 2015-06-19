var chai = require("chai");
chai.use(require("chai-as-promised"));
var expect = chai.expect;

var main = require("./main.es6");

describe("es6", function() {
  describe("generators", function() {
    it("yields and resumes", function() {
      var generator1 = main.generator1;
      var it = main.generator1(5);

      // generator1 has 2 yields, so we call next() 3 times.
      // the first call to next() takes no value, else it is ignored.
      expect(it.next()).to.deep.equal({value: 6, done: false});
      expect(it.next(15)).to.deep.equal({value: 10, done: false});

      // the last time is the return value of the function.
      // x = 5, y = 30, z = 7
      expect(it.next(7)).to.deep.equal({value: 42, done: true});

      // calling next() after we're already done gives undefined value.
      expect(it.next()).to.deep.equal({value: undefined, done: true});
    });

    it("works with async", function() {
      var generator2 = main.generator2;

      var it = generator2();
      expect(it.next()).to.deep.equal({value: 4, done: false});
      expect(it.next()).to.deep.equal({value: 2, done: false});

      var last = it.next();
      expect(last.done).to.equal(true);

      return expect(last.value).to.eventually.equal("42");
    });
  });

  describe("async - promises vs generators", function() {
    it("doesn't work without async support", function(done) {
      main.badSave(main.site0).then(function() {
        done();
      });
    });

    it("works with promises", function(done) {
      main.save(main.site1).then(function() {
        done();
      });
    });

    it("works with generators", function(done) {
      main.genSave(main.site2).then(function() {
        done();
      });
    });
  });
});
