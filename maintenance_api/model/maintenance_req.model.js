
// module.exports = (mongoose)=>{

//     const MaintenanceRequest = mongoose.model('maintenance',mongoose.Schema(
//         {
//             name:String,
//             type:String,
//             description:String
//         },
//         {
//             timestamp:true
//         }
//     ))

//     return MaintenanceRequest;
// }

function maintenanceRequest(mongoose){
    const MaintenanceRequest = mongoose.model('mntRequests',mongoose.Schema(
        {
        name:String,
        type:String,
        description:String
    },
    {
        timestamps:true
    }

    ))
    return MaintenanceRequest
}

module.exports = maintenanceRequest