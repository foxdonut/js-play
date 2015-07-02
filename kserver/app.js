var koa = require("koa");
var app = koa();

var serve = require("koa-static");
app.use(serve(__dirname + "/../public"));

var route = require("koa-route");

var userRoutes = require("../routes/userRoutes");
app.use(route.post("/user", userRoutes.saveUser));
app.use(route.get("/user/:id", userRoutes.getUser));

var homeRoutes = require("../routes/homeRoutes");
app.use(route.get("/", homeRoutes.home));

module.exports = app;
