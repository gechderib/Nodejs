// create a new Tutorial: object.save()
// find a Tutorial by id: findById(id)
// retrieve all Tutorial:find()
// update a turorial by id: findByIdAndUpdate(id,data)
// remove a tutorial :findByIdAndRemove(id)
// remove all Tutorial: deleteMany()
// find all Tutorial by title: find({})

const db = require('../models')
const Tutorial = db.tutorials;

exports.create = (req,res)=>{
    if(!req.body.title){
        res.status(400).send({message:"contnent cant be added"})
        return
    }
    //create tutorial
    const tutorial = new Tutorial({
        title:req.body.title,
        description:req.body.description,
        published:req.body.published?req.body.published:false
    })
    tutorial.save(tutorial).then(data=>{
        res.send(data)
    }).catch(err =>{
        res.status(500).send({
            message:err.message || "some error occurred while creating"
        })
    })
}

exports.findAll = (req,res)=>{
    // const title = req.body.title;
    // console.log(title)
    // var condition = title?{title:{$regex:new RegExp(title),$options:'ifs'}}:{}
    Tutorial.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "some error occurred while returning"
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Tutorials were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };
  
  exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };