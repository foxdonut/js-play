var support = require("./support");
var Task = require("data.task");
var _ = require("ramda");

// Exercise 1
// ==========
// Use safeProp and map/join or chain to safely get the street name for given a user

var safeProp = _.curry(function (x, o) { return support.Maybe.of(o[x]); });
var user = {
  id: 2,
  name: "albert",
  address: {
    street: {
      number: 22,
      name: "Walnut St"
    }
  }
};

var ex1 = _.compose(support.chain(safeProp("name")), support.chain(safeProp("street")), safeProp("address"));


// Exercise 2
// ==========
// Use getFile to get the filename, remove the directory so it's just the file, then purely log it.

var getFile = function() {
  return new support.IO(function(){ return __filename; });
};

var pureLog = function(x) {
  return new support.IO(function(){
    console.log(x);
    return "logged " + x; // for testing w/o mocks
  });
};

var ex2 = _.compose(support.chain(pureLog), _.map(_.compose(_.last, _.split("/"))), getFile);



// Exercise 3
// ==========
// Use getPost() then pass the post's id to getComments().

var getPost = function(i) {
  return new Task(function (rej, res) {
    setTimeout(function () {
      res({ id: i, title: "Love them tasks" }); // THE POST
    }, 300);
  });
};

var getComments = function(i) {
  return new Task(function (rej, res) {
    setTimeout(function () {
      res([{post_id: i, body: "This book should be illegal"}, {post_id: i, body:"Monads are like smelly shallots"}]);
    }, 300);
  });
  };

var ex3 = _.compose(support.join, _.map(getComments), _.map(_.prop("id")), getPost);


// Exercise 4
// ==========
// Use validateEmail, addToMailingList and emailBlast to implement ex4's type signature.
// It should safely add a new subscriber to the list, then email everyone with this happy news.

//  addToMailingList :: Email -> IO [Email]
var addToMailingList = (function(list){
  return function(email) {
    return new support.IO(function(){
      list.push(email);
      return list;
    });
  };
})([]);

//       emailBlast :: [Email] -> IO String
function emailBlast(list) {
  return new support.IO(function(){
    return "emailed: " + list.join(","); // for testing w/o mocks
  });
}

//  validateEmail :: Email -> Either String Email
var validateEmail = function(x){
  return x.match(/\S+@\S+\.\S+/) ? (new support.Right(x)) : (new support.Left("invalid email"));
};

//  ex4 :: Email -> Either String (IO String)
var ex4 = _.pipe(validateEmail, _.map(addToMailingList), _.map(emailBlast));


module.exports = {ex1: ex1, ex2: ex2, ex3: ex3, ex4: ex4, user: user};

