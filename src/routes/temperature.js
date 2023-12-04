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

router.post("/createTemperature/:userEmail/:celcius/:fahrenheit", async(req, res)=>{
    try{
        const celcius = req.params.celcius;
        const fahrenheit = req.params.fahrenheit;
        const user = await UserModel.findOne({email:req.params.userEmail});
        if(!user){
            return res.statusCode(404).json({message: "The user doesn't exist"});
        }
        const newTemp = new TemperatureModel({celcius:celcius,fahrenheit:fahrenheit,userOwner:user._id});
        await newTemp.save();
        res.status(200).json({message: "successfully Created record"});
    }
    catch(err){
        res.json(err);
    }
});

export {router as temperatureRouter}