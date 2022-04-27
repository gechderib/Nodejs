// npm init 
// npm install <package name>
// npm i nodemone -D

var express = require('express')
var fs = require('fs')
var app = express()

app.use(express.json())

var user = {
    "user4" : {
       "name" : "mohit",
       "password" : "password4",
       "profession" : "teacher",
       "id": 4
    }
 }

app.get('/listusers',(req,res)=>{
    fs.readFile('user.json',(err,data)=>{
        if(err){
            console.log(err)
        }
        data = JSON.parse(data)
        res.status(200).json(data)
    })
})

app.post('/adduser',function(req,res){
    // const {newUser} = req.body
    fs.readFile('user.json',function(err,data){

        if(err){
            console.log(err)
        }
        data = JSON.parse( data )
        data['user4'] = user['user4']

        res.status(201).json(data)
    })
})
app.get('/user/:id',(req,res)=>{
    var {id} = req.params
    fs.readFile('user.json',(err,data)=>{
        if(err){
            console.log(err)
        }
        data = JSON.parse(data)
        var user = data['user' + id]
        res.send(user)
    })
    
})


app.listen(5000,()=>{
    console.log('the server is running at prot 5000')
})

// var data = ''
// var data1 = 'this is used for the writing purpus'
// // stream is an event which emmit based on it
// var writeStream = fs.createWriteStream('input.txt')
// writeStream.write(data,'utf8')

// writeStream.end()

// writeStream.on('finish',function(){
//     console.log('this is completd')
// })
// writeStream.on('error',(err)=>{
//     console.log(err)
// })

// var readStream = fs.createReadStream('input.txt')
// readStream.setEncoding('utf8')

// readStream.on('data',function(chunk){
//     data += chunk
// })

// readStream.on('end',()=>{
//     console.log(data)
// })
// readStream.on('error',(err)=>{
//     console.log(err.stack)
// })

// console.log('End of the program')

// http.createServer(function(req,res){
//     res.writeHead(200, {"contnetn-type":'text/plain'})

//     res.end('hello world')
// }).listen(5000)

// console.log('the sever is listening')

// var data = fs.readFileSync('input.txt')
// fs.readFile('input.txt',function(error,data){
//     if(error){
//         console.log(error)
//     }
//     console.log(data.toString())
// })
// console.log(data.toString())
// console.log('the process is end ')