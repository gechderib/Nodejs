

module.exports = app=>{
    const express = require("express");
    const course = require('../controllers/course.controllers')
    const router = express.Router()

    router.post('/',course.createCourse);

    router.get('/',course.findAllCourses);

    router.get('/:id',course.findOnecourse);

    router.put('/:id',course.update);

    router.delete('/:id',course.deleteOne);

    router.delete('/',course.deleteAll);

    app.use('/api/course',router)
}