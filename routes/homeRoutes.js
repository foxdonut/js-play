var render = require("../lib/render");

exports.home = function*() {
  this.body = yield render("home");
};
