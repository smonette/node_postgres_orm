// Where all the objects will be created

var Person = require('./person');

var Models = {};

Models.Person = Person;

//Just testing stuff
// Models.Person.all(function(err, people){
//   console.log("Output from models.person.all")
//   console.log(people);
// });

Models.Person.findBy("id", 1, function(err, person){
  console.log("found", person);
  // person.update({firstname: "sam", lastname: "creek"}, function(err, person){
  //   console.log("UPDATED:", person)
  // });
})


// this brings it to our project
module.exports = Models;