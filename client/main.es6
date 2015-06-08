// main.js
var generator1 = function*(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
};

module.exports = {
  generator1: generator1
};

