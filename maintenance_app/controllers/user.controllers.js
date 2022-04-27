
exports.allAccess = (req,res)=>{
    res.status(200).send({message:"All access board"})
}

exports.userBoard = (req,res)=>{
    res.status(200).send({message:"user board"})
}

exports.adminboard = (req,res)=>{
    res.status(200).send({message:"Admin Board"})
}

exports.moderatorBoard = (req,res)=>{
    res.status(200).send({message:"Moderator Board"})
}