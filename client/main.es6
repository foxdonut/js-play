/* jshint esnext: true */
var generator1 = function*(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
};

var async = function() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve("42");
    }, 10);
  });
};

var generator2 = function*() {
  yield 4;
  yield 2;
  return async();
};

////////////////////////////////////////

var Q = require("q");

////////////////////////////////////////

var badSaveOrderResults = function(site) {
  // console.log(">>> save order results");
  setTimeout(function() {
    console.log("1--- done saving order results");
  }, 500);
  // console.log("<<< returning from save order results");
};

var badSaveOrders = function(site) {
  // console.log(">> save orders");
  if (site.orders) {
    // console.log(">> need to save order results");
    badSaveOrderResults(site);
  }
  else {
    // console.log("don't need to save order results");
  }
  console.log("returning from save orders");
};

var badSave = function(site) {
  // console.log("> save");
  var dfd = Q.defer();
  var promise = dfd.promise;

  badSaveOrders(site);

  if (site.diagnosis) {
    console.log("2--- need to save diagnosis");
    site.diagnosis.$save().then(function() {
      // console.log("done saving diagnosis");
      dfd.resolve();
    });
  }
  else {
    // console.log("don't need to save diagnosis");
    dfd.resolve();
  }

  // console.log("< returning from save");
  return promise;
};

var site0 = {
  orders: true,
  diagnosis: {
    $save: function() {
      var dfd = Q.defer();
      setTimeout(function() {
        dfd.resolve();
      }, 500);
      return dfd.promise;
    }
  }
};

////////////////////////////////////////

var saveOrderResults = function(site) {
  // console.log(">>> save order results");
  var dfd = Q.defer();
  setTimeout(function() {
    console.log("1--- done saving order results");
    dfd.resolve();
  }, 500);
  // console.log("<<< returning from save order results");
  return dfd.promise;
};

var saveOrders = function(site) {
  // console.log(">> save orders");
  var promise = null;

  if (site.orders) {
    // console.log(">> need to save order results");
    promise = saveOrderResults(site);
  }
  else {
    // console.log("don't need to save order results");
    var dfd = Q.defer();
    promise = dfd.promise;
    dfd.resolve();
  }
  console.log("returning from save orders");
  return promise;
};

var save = function(site) {
  // console.log("> save");
  var dfd = Q.defer();
  var promise = dfd.promise;

  saveOrders(site).then(function() {
    if (site.diagnosis) {
      console.log("2--- need to save diagnosis");
      site.diagnosis.$save().then(function() {
        // console.log("done saving diagnosis");
        dfd.resolve();
      });
    }
    else {
      // console.log("don't need to save diagnosis");
      dfd.resolve();
    }
  });

  // console.log("< returning from save");
  return promise;
};

var site1 = {
  orders: true,
  diagnosis: {
    $save: function() {
      var dfd = Q.defer();
      setTimeout(function() {
        dfd.resolve();
      }, 500);
      return dfd.promise;
    }
  }
};

////////////////////////////////////////

var co = require("co");

var genSaveOrderResults = function(site) {
  // console.log(">>> save order results");
  return new Promise(function(resolve) {
    setTimeout(function() {
      console.log("1--- done saving order results");
      resolve();
    }, 500);
  });
};

var genSaveOrders = function*(site) {
  // console.log(">> save orders");

  if (site.orders) {
    // console.log(">> need to save order results");
    yield genSaveOrderResults(site);
  }
  else {
    // console.log("don't need to save order results");
  }
  console.log("returning from save orders");
};

var genSave = function*(site) {
  // console.log("> save");
  yield genSaveOrders(site);

  if (site.diagnosis) {
    console.log("2--- need to save diagnosis");
    yield site.diagnosis.$save();
    // console.log("done saving diagnosis");
  }
  else {
    // console.log("don't need to save diagnosis");
  }
  // console.log("< returning from save");
};

var site2 = {
  orders: true,
  diagnosis: {
    $save: function() {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve();
        }, 500);
      });
    }
  }
};

////////////////////////////////////////

module.exports = {
  generator1: generator1,
  generator2: generator2,
  badSave: badSave,
  site0: site0,
  save: save,
  site1: site1,
  genSave: co.wrap(genSave),
  site2: site2
};

