var koa = require("koa");
var app = koa();

var route = require("koa-route");
var parse = require("co-body");

var monk = require("monk");
var wrap = require("co-monk");
var db = monk("localhost/koa_users");
var users = wrap(db.get("users"));

var saveUser = function*() {
  var userFromRequest = yield parse.json(this);
  console.log("userFromRequest:", userFromRequest);
  var user = yield users.insert(userFromRequest);

  this.body = user;
  this.set("Location", "/user/" + user._id);
  this.status = 201; // CREATED
};

var getUser = function*(id) {
  var user = yield users.findById(id);
  this.body = user;
  this.status = 200; // OK
};

app.use(route.post("/user", saveUser));
app.use(route.get("/user/:id", getUser));

app.use(function*() {
  this.body = "Hello, Koa";
});

var port = 3000;
app.listen(port);

console.log("The app is listening on port", port);

