var curry = require("ramda").curry;

module.exports.add = curry(function(x, y) {
  return x + y;
});

module.exports.match = curry(function(what, x) {
  return x.match(what);
});

module.exports.replace = curry(function(what, replacement, x) {
  return x.replace(what, replacement);
});

module.exports.filter = curry(function(f, xs) {
  return xs.filter(f);
});

module.exports.map = curry(function(f, xs) {
  return xs.map(f);
});

module.exports.reduce = curry(function(f, a, xs) {
  return xs.reduce(f, a);
});

module.exports.split = curry(function(what, x) {
  return x.split(what);
});

module.exports.join = curry(function(what, x) {
  return x.join(what);
});

module.exports.toUpperCase = function(x) {
  return x.toUpperCase()
};

module.exports.toLowerCase = function(x) {
  return x.toLowerCase()
};

