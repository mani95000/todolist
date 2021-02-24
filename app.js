var express = require("express");
var app =  express();
var port = 3000;
var bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));


var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");
var nameSchema = new mongoose.Schema({
    toDo: String
});

var User = mongoose.model("User",nameSchema);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"public");
});

app.post("/addTodo",(req,res)=>{
    var myData = new User(req.body);
    myData.save()
    .then(item=>{
        res.send("Todo saved to database");
    })
    .catch(err=>{
        res.status(400).send("Unable to save to database");
    });
});





app.listen(port,()=>{
    console.log("Server listening on port" + port);
});