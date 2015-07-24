var support = require("./support");
var _ = require("ramda");

// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function

/*
var words = function(str) {
  return support.split(" ", str);
};
*/
var words = support.split(" ");

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

var sentences = support.map(words);


// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions

/*
var filterQs = function(xs) {
  return support.filter(function(x){ return support.match(/q/i, x);  }, xs);
};
*/

var filterQs = support.filter(support.match(/q/i));

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any arguments

// LEAVE BE:
var _keepHighest = function(x,y){ return x >= y ? x : y; };

// REFACTOR THIS ONE:
/*
var max = function(xs) {
  return support.reduce(function(acc, x){
    return _keepHighest(acc, x);
  }, 0, xs);
};
*/

var max = support.reduce(_keepHighest, 0);

  
// Bonus 1:
// ============
// wrap array's slice to be functional and curried.
// //[1,2,3].slice(0, 2)

/* this was my answer
var slice = function(s) {
  return function(n) {
    return function(arr) {
      return arr.slice(s, n);
    }
  }
};
*/
// _.curry is a helper to achieve the above
var slice = _.curry(function(s, n, arr) {
  return arr.slice(s, n);
});


// Bonus 2:
// ============
// use slice to define a function "take" that takes n elements. Make it curried
var take = slice(0);


module.exports = {
  words: words,
  sentences: sentences,
  filterQs: filterQs,
  max: max,
  slice: slice,
  take: take
};

