//create a new Tutorial: object.save()
//find a Tutorial by id: findById(id)
// retrieve all Tutorial:find()
// update a turorial by id: findByIdAndUpdate(id,data)
//remove a tutorial :findByIdAndRemove(id)
//remove all Tutorial: deleteMany()
// find all Tutorial by title: find({})


const db = require('../models')
const Course = db.course



exports.createCourse = (req,res)=>{
    res.setHeader("content-type", "application/json")
    if(!req.body.title){
     res.status(400).send({course:"Course can\'t be added without title"})   
    }

    //create course
    const course = new Course({
        title:req.body.titleCourse,
        code:req.body.code,
        description:req.body.description,
        ects:req.body.ects,
    })

    course.save(course).then(data=>{
        res.status(201).send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message})
    })
}

exports.findAllCourses = (req,res)=>{
    Course.find({}).then(data=>{
        res.status(200).send(data)
    }).catch(err=>{
        res.status(500).send({message: err.message})
    })
}

exports.findOnecourse = (req,res)=>{
    const id = req.params.id
    Course.findById(id).then(data=>{
        res.status(200).send(data)
    }).catch(err=>{
        res.status(500).send({message: err.message || "somthing is happening in the background"})
    })
}

exports.update = (req,res)=>{
    const id = req.params.id;

    if(!req.body){
        res.status(400).send({message: "the data to be updated can't be empty"})

    }
    Course.findByIdAndUpdate(id,req.body,{useFindAndModify:false}).then(
     data=>{
         if(!data){
             res.status(400).send({message: 'cant update data with id;'})
         }else{
             res.status(204).send({message:"the data is updated successfully"})
         }
     }      
    ).catch(err=>{
        res.status(500).send({message:err.message || "error happen while updating the course"})
    })
    
}

exports.deleteAll = (req,res)=>{
    Course.deleteMany({}).then(data=>{
        res.status(204).send({message:`${data.deleteCount} data is successfully deleted`})
    }).catch(err=>{
        res.status(500).send({message:err.message || "error happen while deleting the course"})
    })
}

exports.deleteOne = (req,res)=>{
    const id = req.params.id;
    Course.findByIdAndRemove(id).then(data=>{
        if(!data){
            res.status(400).send({message:"data not found"})
        }else{
            res.status(204).send({message:`data with id ${id} is successfully deleted`})
        }
    }).catch(err=>{
        res.status(500).send({message:err.message || "error happen "})
    })
}