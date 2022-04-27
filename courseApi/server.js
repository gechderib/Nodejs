const express = require('express')
const cors = require('cors')

app = express()

var corsOption = {origin:'http://localhost:5000'}
app.use(cors(corsOption))
//used to parse request of content type application/json 
app.use(express.json())
//used to parse request of content type application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))


const db = require('./models/index')

db.mongoose.connect(db.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(`the url is ${db.url}`)
}).catch(err=>{
    console.log("error is happpen whil connecting to the database")
})

require('./routes/course.routes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("the sever is running at port 500")
})
