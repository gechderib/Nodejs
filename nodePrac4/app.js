var express = require('express');
var jwt = require('jsonwebtoken');
var sqlite = require('sqlite3');
var crypto = require('crypto');
var cors = require("cors")


const KEY = "m yincredibl y(!!1!11!)<'SECRET>)Key'!";

var db = new sqlite.Database("users.sqlite3");

// db.run(`CREATE TABLE users(
//     id INTEGER PRIMARY KEY,
//     username TEXT NOT NULL,
//     password TEXT NOT NULL
//   )`);
  
//   db.close();

var app = express();

app.use(express.json(),cors())

app.post('/signup',express.urlencoded({extended:true}),(req,res)=>{
    var password = crypto.createHash('sha256').update(`${req.body.password}`).digest('hex')
    db.get('SELECT * FROM users WHERE username = ?',[req.body.username],(err,row)=>{
        if(row != undefined){
            console.log('error is happen')
            res.status(409)
            res.send("An user with that user name alrady exist")
        }else{
            console.log("Can create user" + req.body.username)
            db.run('INSERT INTO users(username,password) VALUES(?,?)',[req.body.username,password])
            res.status(201)
            res.send("Success")
        }
    })
})

app.post('/login',express.urlencoded({extended:true}),(req,res)=>{
    console.log(req.body.username + " attempted login");
    var password = crypto.createHash('sha256').update(`${req.body.password}`).digest('hex');

    db.get('SELECT * FROM users WHERE (username, password) = (?,?)',[req.body.username,password],(err,row)=>{
        if(row != undefined){
            var payload = {
                username: req.body.username
            }

            var token = jwt.sign(payload,KEY, {algorithm:"HS256", expiresIn:"15d"})
            console.log('SUCCESS')
            res.send(token)
        }else{
            console.log('failure')
            res.status(401).send('Their is no user match that')
        }
    })
})

app.get('/data', function(req, res) {
    var str = req.get('username');
    try {
      jwt.verify(str, KEY, {algorithm: 'HS256'});
      res.send("Very Secret Data");
    } catch {
      res.status(401);
      res.send("Bad Token");
    }
  
  });


app.listen(5000,()=>{
    console.log("server is runing at port:5000")
})