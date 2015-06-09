/* jshint esnext: true */
var generator1 = function*(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
};

var async = function() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve("42");
    }, 10);
  });
};

var generator2 = function*() {
  yield 4;
  yield 2;
  return async();
};

module.exports = {
  generator1: generator1,
  generator2: generator2
};

