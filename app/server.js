const express = require('express')
const cors = require('cors')

const app = express()

var corsOption = {origin:'http://localhost:5000'}
app.use(cors(corsOption))
//used to parse request of content type application/json 
app.use(express.json())
//used to parse request of content type application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))

const db = require("./models/index")

db.mongoose.connect(db.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(`connected to the database!${db.url}`)
}).catch(err=>{
    console.log("connot connect to the database",err)
    process.exit();
})


require("./routes/tutorial.routes")(app)



const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON POSRT:${PORT}`)
})