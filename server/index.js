var express = require("express");
var mongodb = require("mongodb").MongoClient;
var databaseString = 'mongodb://127.0.0.1:27017';
var cors = require("cors");
const { MongoClient } = require("mongodb");


var  app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json());
app.listen(8080);

console.log('server started at port 8080...')

app.get("/getusers",function(request,response){
    mongodb.connect(databaseString,function(err,clientObj){
            if(!err){
               var dbo =  clientObj.db("ishopdb");
               dbo.collection("users").find({}).toArray(function(err, document){
                   if(!err){
                     response.send(document);
                   }else{
                       console.log("error....")
                   }
               })
            }
    })
})

app.post("/registeruser",function(request,resp){
    console.log('inside register user function');
    console.log('username = '+request.body.username);
   // console.log("data:request.body.username ="+request.body.username);
    var data = {

        "username":request.body.username,
        "password":request.body.password,
        "email":request.body.email,
        "gender":request.body.gender

    }
    mongodb.connect(databaseString,function(err,clientObj){
        if(!err){
            var dbo = clientObj.db("ishopdb");
            dbo.collection("users").insertOne(data,function(err,response){
                if(!err){
                    console.log('data inserted....');
                    resp.send("Registered successfully...");
                   
                }
            });
          
        }
        
    });
    
    
})
