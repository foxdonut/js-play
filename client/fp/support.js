var _ = require("ramda");
var Task = require("data.task");
var curry = _.curry;

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
  return x.toUpperCase();
};

module.exports.toLowerCase = function(x) {
  return x.toLowerCase();
};

var inspect = function(x) {
  return (x && x.inspect) ? x.inspect() : x;
};

module.exports.inspect = inspect;

// Identity
var Identity = function(x) {
  this.__value = x;
};

Identity.of = function(x) { return new Identity(x); };

Identity.prototype.map = function(f) {
  return Identity.of(f(this.__value));
};

Identity.prototype.inspect = function() {
  return "Identity("+inspect(this.__value)+")";
};

module.exports.Identity = Identity;

// Maybe
var Maybe = function(x) {
  this.__value = x;
};

Maybe.of = function(x) {
  return new Maybe(x);
};

Maybe.prototype.isNothing = function(f) {
  return (this.__value === null || this.__value === undefined);
};

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
};

Maybe.prototype.join = function() {
  return this.isNothing() ? Maybe.of(null) : this.__value;
};

Maybe.prototype.inspect = function() {
  return this.isNothing() ? "Nothing" : "Maybe("+inspect(this.__value)+")";
};

module.exports.Maybe = Maybe;


// Either
var Either = function() {};
Either.of = function(x) {
  return new Right(x);
};

var Left = function(x) {
  this.__value = x;
};

Left.of = function(x) {
  return new Left(x);
};

Left.prototype.map = function(f) { return this; };
Left.prototype.join = function() { return this; };
Left.prototype.chain = function() { return this; };
Left.prototype.inspect = function() {
  return "Left("+inspect(this.__value)+")";
};


var Right = function(x) {
  this.__value = x;
};

Right.of = function(x) {
  return new Right(x);
};

Right.prototype.map = function(f) {
  return Right.of(f(this.__value));
};

Right.prototype.join = function() {
  return this.__value;
};

Right.prototype.chain = function(f) {
  return f(this.__value);
};

Right.prototype.inspect = function() {
  return "Right("+inspect(this.__value)+")";
};

module.exports.Either = Either;
module.exports.Left = Left;
module.exports.Right = Right;

// IO
var IO = function(f) {
  this.unsafePerformIO = f;
};

IO.of = function(x) {
  return new IO(function() {
    return x;
  });
};

IO.prototype.map = function(f) {
  return new IO(_.compose(f, this.unsafePerformIO));
};

IO.prototype.join = function() {
  return this.unsafePerformIO();
};

IO.prototype.inspect = function() {
  return "IO("+inspect(this.unsafePerformIO)+")";
};
module.exports.IO = IO;

module.exports.unsafePerformIO = function(x) { return x.unsafePerformIO(); };

module.exports.either = curry(function(f, g, e) {
  switch(e.constructor) {
    case Left: return f(e.__value);
    case Right: return g(e.__value);
    default: return undefined;
  }
});

// overwriting join from pt 1
module.exports.join = function(m){ return m.join(); };

module.exports.chain = curry(function(f, m){
  return m.map(f).join(); // or compose(join, map(f))(m)
});

Task.prototype.join = function(){ return this.chain(_.identity); };

module.exports.Task = Task;

