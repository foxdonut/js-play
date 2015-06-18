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

// The two functions below show the before/after middleware sequence:
// before 1
// before 2
// after 2
// after 1

app.use(function*(next) {
  console.log("before 1");
  yield next;
  console.log("after 1");
});

app.use(function*(next) {
  console.log("before 2");
  yield next;
  console.log("after 2");
});

app.use(function*() {
  this.body = "Hello, Koa";
});

var port = 3000;
app.listen(port);

console.log("The app is listening on port", port);

