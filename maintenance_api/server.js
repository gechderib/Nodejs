const express = require('express')
const cors = require('cors')
const app = express()


var corsOption = {origin:'http://localhost:5000'}

app.use(cors(corsOption))

app.use(express.json())

app.use(express.urlencoded({extends:false}))


const db = require('./model/index')

db.mongoose.connect(db.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(`connected to the database!${db.url}`)
}).catch(err=>{
    console.log("connot connect to the database",err)
    process.exit();
})

require('./router/maintenance.routers')(app)


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("SERVER IS LISTENING TO PORT NUMBET" + PORT)
})