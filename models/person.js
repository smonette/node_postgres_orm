var db = require('./db');

function Person(params) {
  this.firstname = params.firstname;
  this.lastname = params.lastname;
  this.twitter = params.twitter;
  this.id = params.id;
};

Person.all = function(callback){
  var myQuery = "SELECT * FROM people";
  db.query(myQuery,[], function(err, res){
    var allPeople = [];

    if(err) {
      console.log("Error!");
    } else {
      res.rows.forEach(function(i){
        allPeople.push(new Person(i));
      });
    }

    callback(err, allPeople);
  });
}

Person.findBy = function(key, val, callback) {
  var myQuery = "SELECT * FROM people WHERE "+key+" =$1";
  db.query(myQuery,[val], function(err, res){
      var foundRow, foundPerson;
      if (err) {
        console.log("Something went wrong!");
      } else {
        foundRow = res.rows[0];
        foundPerson = new Person(foundRow); 
      }
      callback(err, foundPerson);
  });
};


Person.create = function(params, callback){
  var myQuery = "INSERT INTO people (firstname, lastname, twitter) VALUES ($1, $2, $3)";
  db.query(myQuery, [params.firstname, params.lastname, params.twitter], function(err, res){
    var createdRow, newPerson;
    callback(err, newPerson);
  });
};


Person.prototype.update = function(params, callback) {
  var colNames = [];
  var colVals = [];
  var count = 2;

  for(var key in this) {
    if(this.hasOwnProperty(key) && params[key] !== undefined){
      var colName = key + "=$" + count;
      colNames.push(colName);
      colVals.push(params[key]);
      count++;
    }
  }

  var statement = "UPDATE people SET " + colNames.join(", ") + " WHERE id=$1 RETURNING *";
  var values = [this.id].concat(colVals);
  console.log("Running:");
  console.log(statement, "with values", values);
  var _this = this;
  db.query(statement, values, function(err, res) {
    var updatedRow;
    if(err) {
      console.error("OOP! Something went wrong!", err);
    } else {
      updatedRow = res.rows[0];
      _this.firstname = updatedRow.firstname;
      _this.lastname = updatedRow.lastname;
      _this.twitter = updatedRow.twitter;
    }
    callback(err, _this)
  });
}

Person.prototype.destroy = function(id, callback){
  db.query("DELETE FROM people WHERE id = $1", [this.id], function(err, res) {
    callback(err)
  });
}

module.exports = Person;
