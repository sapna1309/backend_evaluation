const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Model/User.model");

const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        console.log({ error: err.message });
      } else {
        const User = new UserModel({
          name,
          email,
          gender,
          age,
          city,
          password: hash,
        });
        await User.save();
        res.send({ message: "User has been registered successfully" });
      }
    });
  } catch (error) {
    res.send({ message:"Something went wrong",error: error.message });
  }
});

UserRouter.post("/login", async (req, res) => {
    const {email,password}=req.body;
    try {
      const User = await UserModel.find({email});
      if(User.length>0){
        bcrypt.compare(password,User[0].password,(err, result)=> {
        if(err){
            console.log({error:err.message});
        }else if(result){
           const token = jwt.sign({UserId:User[0]._id},"anysecretkey");
           res.send({message:"User has been login successfully",token:token});
        }else{
            res.send({message:"Wrong Credentials"});
        }
        });
      }  
    } catch (error) {
      res.send({ message:"Something went wrong",error: error.message });  
    }
});

module.exports={UserRouter};
