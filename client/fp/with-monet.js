var R = require("ramda");
var M = require("monet");
var $ = require("jquery");
var B = require("baconjs");

var log = function(x) {
  console.log(x);
  return x; 
};

// String -> IO DOM
// var getDOM = function(sel) { return M.IO(function() { return $(sel); }); };
var getDOM = $.io1();

// DOM -> EventStream DomEvent
var listen = R.pipe(R.flip, R.curry)(B.fromEvent);
var keyStream = listen("keyup");

var getValue = R.path(["target", "value"]);

var app = R.pipe(getDOM, R.map(keyStream));

app("#search").run().onValue(R.pipe(getValue, log));

