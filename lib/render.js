var views = require("co-views");
var config = {
  map: { html: "swig" }
};
module.exports = views(__dirname + "./../views", config);
