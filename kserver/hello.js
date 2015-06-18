var koa = require("koa");
var app = koa();

app.use(function*() {
  this.body = "Hello, Koa";
});

var port = 3000;
app.listen(port);

console.log("The app is listening on port", port);

