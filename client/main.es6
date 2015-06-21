/* jshint esnext: true */
var _ = require("lodash");
var radio = require("radio");

var regularFunction = function() {
  this.numbers = [1, 2, 3, 5, 8];
  var self = this;

  radio("regularAddNumbers").subscribe(function() {
    self.result = _.sum(self.numbers);
  });
};

var arrowFunction = function() {
  this.numbers = [1, 2, 3, 5, 8];

  radio("arrowAddNumbers").subscribe(() => {
    this.result = _.sum(this.numbers);
  });
};

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

var badSaveOrderResults = function(site) {
  setTimeout(function() {
    console.log("1--- done saving order results");
  }, 200);
};

var badSaveOrders = function(site) {
  if (site.orders) {
    badSaveOrderResults(site);
  }
  else {
    console.log("don't need to save order results");
  }
  console.log("returning from save orders");
};

var badSave = function(site, orders, diagnosis) {
  console.log("running badSave:", orders, diagnosis);

  return new Promise(function(resolve) {
    site.orders = orders;
    site.diagnosis = diagnosis ? site.diagnosisFn : false;

    badSaveOrders(site);

    if (site.diagnosis) {
      console.log("2--- need to save diagnosis");
      site.diagnosis.$save().then(function() {
        resolve();
      });
    }
    else {
      console.log("don't need to save diagnosis");
      resolve();
    }
  });
};

var site0 = {
  diagnosisFn: {
    $save: function() {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve();
        }, 200);
      });
    }
  }
};

////////////////////////////////////////

var saveOrderResults = function(site) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      console.log("1--- done saving order results");
      resolve();
    }, 200);
  });
};

var saveOrders = function(site) {
  var promise = null; 

  if (site.orders) {
    promise = saveOrderResults(site);
  }
  else {
    console.log("don't need to save order results");
    promise = new Promise(function(resolve) {
      resolve();
    });
  }
  console.log("returning from save orders");
  return promise;
};

var save = function(site, orders, diagnosis) {
  console.log("running save:", orders, diagnosis);

  return new Promise(function(resolve) {
    site.orders = orders;
    site.diagnosis = diagnosis ? site.diagnosisFn : false;

    saveOrders(site).then(function() {
      if (site.diagnosis) {
        console.log("2--- need to save diagnosis");
        site.diagnosis.$save().then(function() {
          resolve();
        });
      }
      else {
        console.log("don't need to save diagnosis");
        resolve();
      }
    });
  });
};

var site1 = {
  diagnosisFn: {
    $save: function() {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve();
        }, 200);
      });
    }
  }
};

////////////////////////////////////////

var co = require("co");

var genSaveOrderResults = (site) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("1--- done saving order results");
      resolve();
    }, 200);
  });
};

var genSaveOrders = function*(site) {
  if (site.orders) {
    yield genSaveOrderResults(site);
  }
  else {
    console.log("don't need to save order results");
  }
  console.log("returning from save orders");
};

var genSave = function*(site, orders, diagnosis) {
  console.log("running genSave:", orders, diagnosis);

  site.orders = orders;
  site.diagnosis = diagnosis ? site.diagnosisFn : false;

  yield genSaveOrders(site);

  if (site.diagnosis) {
    console.log("2--- need to save diagnosis");
    yield site.diagnosis.$save();
  }
  else {
    console.log("don't need to save diagnosis");
  }
};

var site2 = {
  diagnosisFn: {
    $save: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 200);
      });
    }
  }
};

////////////////////////////////////////

module.exports = {
  regularFunction: regularFunction,
  arrowFunction: arrowFunction,
  generator1: generator1,
  generator2: generator2,
  badSave: badSave,
  site0: site0,
  save: save,
  site1: site1,
  genSave: co.wrap(genSave),
  site2: site2
};

