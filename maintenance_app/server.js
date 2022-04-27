const express = require('express')
const cors = require("cors")

const app = express()

var corsOptions = {
    origin: "http://localhost:5000"
  };
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//connect to database///////////////////////
const db = require("./models/index");
const dbConfig = require('./config/db.config');
const Role = db.role

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("successfully connected")
    initial()
})
.catch(err =>{
    console.error("Connection error", err)
    process.exit()
})

/////////////////////////////////////////////
//estimatedDocumentCount=> a model function used to get the element of a collection and their count
function initial(){
    Role.estimatedDocumentCount((err,count)=>{
        if(!err && count == 0){
            new Role({
                name:"user"
            }).save(err=>{
                if(err){
                    console.log("error: "+ err)
                }
                console.log("added 'user' to roles collection");
            });

            new Role({
                name:"admin"
            }).save(err=>{
                if(err){
                    console.log("error: " + err)
                }
                console.log("added 'admin' to roles collection");
            });

            new Role({
                name:"moderator"
            }).save(err=>{
                if(err){
                    console.log("error: " + err)
                }
                console.log("added 'moderator' to roles collection");
            })
        }
    })
}

require("./routes/auth.routes")(app)
require("./routes/user.routes")(app)

app.listen(5000,()=>{
    console.log("Listening at port 5000")
})