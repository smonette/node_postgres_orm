var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Person = require('./models/main.js').Person,
  app = express();

app.use(express.static(__dirname + '/public'));

app.set("view engine", "ejs");
// Middleware
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));

app.get("/", function(req, res){
  Person.all(function(err,allPeople){
    res.render("people/index", {people: allPeople})
  });
});


app.get("/people", function(req, res){
  Person.all(function(err,allPeople){
    res.render("people/index", {people: allPeople})
  });
});


app.get("/people/new", function(req, res){
  res.render("people/new")
});


app.get("/people/:id", function(req,res){
  var personId = Number(req.params.id);

  Person.findBy("id", personId, function(err, ourPerson) {
    console.log(personId);
    res.render("people/show", {person: ourPerson});
  });

});


app.get("/people/:id/edit", function(req,res){
  var personId = Number(req.params.id);
  Person.findBy("id", personId, function(err, ourPerson) {
    res.render("people/edit", {person: ourPerson});
  });

});



app.post("/people", function(req, res){
  var personDeets = req.body.person;
  Person.create (personDeets, function(err, newPerson){
  });
  res.redirect("/people");
});


app.delete("/people/:id", function(req, res){
    var personId = Number(req.params.id);

    Person.findBy("id", personId, function(err, ourPerson) {
      ourPerson.destroy(personId, function(err, ourPerson){
      
      });
    });
  res.redirect("/people");
});


app.put("/people/:id", function(req,res){
  
  var personId = Number(req.params.id);

  Person.findBy("id", personId, function(err, ourPerson) {
    ourPerson.update({firstname: req.body.person.firstname, lastname: req.body.person.lastname, twitter: req.body.person.twitter}, function(err, ourPerson){

    });
  });

  res.redirect("/people");
});


app.listen(3000, function(){
  console.log("THE SERVER IS LISTENING ON localhost:3000");
});
