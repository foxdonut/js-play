var chai = require("chai");
chai.use(require("chai-as-promised"));
var expect = chai.expect;

var _ = require("lodash");

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
    var combinations = [[false, false], [false, true], [true, false], [true, true]];

    var runTest = function(testFn) {
      _.each(combinations, function(combination) {
        testFn(combination[0], combination[1])
      });
    }

    runTest(function(orders, diagnosis) {
      it("doesn't work without async support: " + orders + " " + diagnosis, function(done) {
        main.badSave(main.site0, orders, diagnosis).then(function() {
          done();
        })
      });
    });

    runTest(function(orders, diagnosis) {
      it("works with promises: " + orders + " " + diagnosis, function(done) {
        main.save(main.site1, orders, diagnosis).then(function() {
          done();
        });
      });
    });

    runTest(function(orders, diagnosis) {
      it("works with generators: " + orders + " " + diagnosis, function(done) {
        main.genSave(main.site2, orders, diagnosis).then(function() {
          done();
        });
      });
    });
  });
});
