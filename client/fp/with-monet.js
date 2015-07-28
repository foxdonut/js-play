var R = require("ramda");
var M = require("monet");
var $ = require("jquery");
var Bacon = require("baconjs");

var log = function(x) {
  console.log(x);
  return x; 
};

var getDom = M.IO($);

var listen = R.curry(R.flip(Bacon.fromEvent));
var keyStream = listen("keyup");

var app = R.pipe(getDom);
