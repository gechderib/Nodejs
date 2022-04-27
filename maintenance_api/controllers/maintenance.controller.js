const db = require('../model/index')

const Maintenance = db.maintenances

exports.create = (req, res)=>{
    if(!req.body.type){
        res.status(400).send({message:"content cant be added"})
        return;
    }
    // create maintenance 
    const maintenance = new Maintenance({
        name:req.body.name,
        type:req.body.type,
        description: req.body.description
    })

    maintenance.save(maintenance)
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "some error occure while creating"})
    })
}


exports.findAll = (req,res)=>{

    // const name = req.body.name;
    // var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};


    Maintenance.find({}).then((data)=>{
        res.send(data) 
    }).catch(err=>{
        res.status(500).send({message:err.message || "something bad happen wil fetch"})
    })
}

exports.findOne = (req,res)=>{

    const id = req.params.id
    Maintenance.findById(id).then((data)=>{
        if(!data){
            res.status(400).send({message:"data with id ${id} not found"})
        }else{
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({message:"No maintenance with id " + id})
    })
}

exports.update = (req,res)=>{
    if(!req.body.name){
        res.status(404).send({message:"Not found"})
    }

    const id = req.params.id;

    Maintenance.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(400).send({message:"their is no avilable data"})
        }else{
            // res.send(data)
            res.send({message:"user with id ${id} is updaed"})
        }
    }).catch(err=>{
        res.status(500).send({message:"their is no update with id ${id}"})
    })
}

exports.delete = (req,res)=>{
    const id = req.params.id;

    Maintenance.findByIdAndRemove(id).then((data)=>{
        if(!data){
            res.status(404).send({message:"can't delete element with id ${id}"})
        }else{
            res.send({message:"deleted successfully"})
        }
    }).catch(err=>{
        res.status(500).send({message:err.message || "something bad happen"})
    })
}

exports.deleteAll = (req,res)=>{
    Maintenance.deleteMany({}).then((data)=>{
        if(!data){
            res.send({message:"their is no data"})
        }else{
            res.status(204).send({message:"all data deleted successfully"})
        }
    }).catch(err=>{
        res.status(500).send({message:err.message})
    })
}

exports.findAllFixed = (req,res)=>{
    Maintenance.find({name:"teddy"}).then((data)=>{
        res.status(200).send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message})
    })
}

