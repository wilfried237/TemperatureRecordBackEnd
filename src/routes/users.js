import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserModel } from "../model/Users.js"

const router = express.Router();

router.post("/register", async(req, res)=>{
    const {firstname, lastname, email, address, flatNo, password} = req.body;
    const userEmail = await UserModel.findOne({email});
    if(userEmail){
        return res.json({message: "User already exist",flag: false});
    }
    const harshPassword = await bcrypt.hash(password,10);

    const newUser = new UserModel({firstname: firstname,lastname: lastname,email: email,address: address,flatNo: flatNo,password: harshPassword});

    await newUser.save();

    res.json({message: `Welcome ${lastname}`, flag: true });
});

router.post("/login", async (req, res)=>{
    const {email, password} = req.body;

    const userEmail = await UserModel.findOne({email:email});

    if(!userEmail){
        return res.json({message: "User doesn't exist" , flag: false});
    }
 
    const isPasswordValid = await bcrypt.compare(password,userEmail.password);

    if(!isPasswordValid){
        return res.json({message: "UserName or Password doesn't exist", flag: false});
    }

    const token = jwt.sign({id: userEmail._id},"secret");

    res.json({message: `Welcome back ${userEmail.lastname}`,token,userID:userEmail._id, flag: true});
});

export {router as userRouter}