
module.exports = mongoose =>{
    const Course = mongoose.model('course',mongoose.Schema(
        {
            title:String,
            code:String,
            description:String,
            ects:Number

        },
        {
            timestamp:true
        }
    ))
    return Course;
}

// function funName(mon){
//     const course = mongoose.model('tableName',mongoose.schema(
//         {
//             title:String,
//             firstName:String,

//         },
//         {
//             timestamp:true
//         }
//     ))
//     return course;
// }

// module.exports = {funName}