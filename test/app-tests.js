var app = require("../kserver/app");
var request = require("supertest").agent(app.listen());

describe("Simple user HTTP CRUD API", function() {
  var sampleUser = { name: "foxdonut", age: 41, height: 1.77, weight: 145 };
  var locationRegex = /^\/user\/[0-9a-fA-F]{24}$/;

  it("adds a user", function(done) {
    request
      .post("/user")
      .send(sampleUser)
      .expect("location", locationRegex)
      .expect(201, done);
  });
});
