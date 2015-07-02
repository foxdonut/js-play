var parse = require("co-body");
var monk = require("monk");
var wrap = require("co-monk");
var db = monk("localhost/koa_users");
var users = wrap(db.get("users"));

exports.saveUser = function*() {
  var userFromRequest = yield parse.json(this);
  var user = yield users.insert(userFromRequest);

  this.body = user;
  this.set("Location", "/user/" + user._id);
  this.status = 201; // CREATED
};

exports.getUser = function*(id) {
  var user = yield users.findById(id);
  this.body = user;
  this.status = 200; // OK
};

