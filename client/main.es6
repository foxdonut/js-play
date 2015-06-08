// main.js
var iter1 = function*(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
};

module.exports = {
  iter1: iter1
};

