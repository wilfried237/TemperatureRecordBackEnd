import express from "express"
import { TemperatureModel } from "../model/Temperature.js"
import { UserModel } from "../model/Users.js";
import { verificationToken } from "../middleware/UserVerification.js";

const router = express.Router();

router.get("/getTemperature/:userEmail", verificationToken, async(req,res)=>{
    try{
        const user = await UserModel.findOne({email:req.params.userEmail});
        const allTemp = await TemperatureModel.find({userOwner:user._id});
        res.json(allTemp);
    }
    catch(err){
        res.json(err);
    }
});

router.post("/createTemperature", async(req, res)=>{
        const {celcius,fahrenheit,email} = req.body;
        const user = await UserModel.findOne({email:email});
        if(!user){
            return res.statusCode(404).json({message: "The user doesn't exist"});
        }
        const newTemp = new TemperatureModel({celcius,fahrenheit:fahrenheit,userOwner:user._id});
        await newTemp.save();
        console.log("good job");
        res.status(200).json({message: "successfully Created record"});
});

export {router as temperatureRouter}