const mongoose  = require("mongoose");

const User = mongoose.model('User',mongoose.Schema({
    username:String,
    email:String,
    password:String,
    roles:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Role"
        }
    ]
}))

module.exports = User




// second and shortest way

// const {Schema} = mongoose // their is a schema object inside mongoose

// const roleSchema = Schema({
//     username:String,
//     email:String,
//     password:String,
//     rolse:[
//         {
//             type:Schema.Types.ObjectId,
//             ref:"Role"
//         }
//     ]
// })

// const Role = mongoose.model("Role",roleSchema)