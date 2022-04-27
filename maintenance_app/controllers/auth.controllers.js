const db = require("../models/index");
const User = db.user;
const Role = db.role;
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.signUp = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find({
        name: { $in: req.body.roles },
      },
      (err,roles)=>{
          if(err){
              res.status(500).send({message:err})
              return;
          }
          user.roles = roles.map(role => role._id)
          user.save(err=>{
              if(err){
                  res.status(500).send({message:err})
                  return;
              }
              res.send({message:"user register successfuly"})
          })
      }
      );
    }else{
        Role.find({
            name:"user"
        },(err,role)=>{
            if(err){
                res.status(500).send({message:err})
                return
            }
            user.roles = [role._id]
            user.save(err=>{
                if(err){
                    res.status(500).send({message:err})
                    return
                }
                return res.status(200).send({message:"Use successfully registerd"})
            })
        })
    }
  });
};


exports.signin = (req,res)=>{
    User.findOne({
        email:req.body.email
    }).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err})
            return;
        }
        if(!user){
            res.status(404).send({message:"no email"})
            return
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,user.password
        )
        if(!passwordIsValid){
            return res.status(401).send({accessToken:null, message:"Invalid password"})   
        }
        var token = jwt.sign({id:user.id},config.secret,{expiresIn:58462})

        var authority = []
        for(let i=0;i<user.roles.length;i++){
            authority.push("ROLE_"+user.roles[i].name.toUpperCase())
        }
        res.status(200).send({
            id:user.id,
            username:user.username,
            email:user.email,
            roles:authority,
            accessToken:token,
        })
    })
}