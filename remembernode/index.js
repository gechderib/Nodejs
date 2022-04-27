
const express = require('express')

const app = express()

// pars json using express
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const port = 8000


let movies = [
    {
        id:1,
        title:"GOT",
        director:"drunker",
        releasedData:2011
    },
    {
        id:2,
        title:"breaking bad",
        director:"drunker",
        releasedData:2019
    },
]

// get the movie

app.get('/movie',(req,res)=>{
    return res.json(movies)
})

// add a movie

app.post('/movie',(req,res)=>{
    const movie = req.body
    console.log(movie)

    movies.push(movie)
    res.send("movie is added to the list")
    

})
// search for a movie using id

app.get('/movie/:id',(req,res)=>{
    const param = req.params
    const movie = movies.find((movie)=> movie.id === Number(param.id))
    if(movie){
        return res.json(movie)
    }
    return res.status(404).send('not found')
    
})

// delete the movie

app.delete("/movie/:id",(req,res)=>{
    const param = req.params
    const movie = movies.filter((movie)=>movie.id !== Number(param.id))
    movies = movie
    res.send('jfdk')

})


// set the server to listen  the port

app.listen(port,()=>{
    console.log("listening at port " + port)
})