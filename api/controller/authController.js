import User from '../models/userModel.js'
import bcrypt from 'bcryptjs';



export const signup=async(req,res,next)=>{

const{username,email,password}=req.body;
const hashedPasswrod =bcrypt.hashSync(password,10);
const newUser=new User({username,email,password:hashedPasswrod});

try {
    await newUser.save()
res.status(201).json("user created successfully")
} catch (error) {
   next(error);
}
}