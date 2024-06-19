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

router.post("/createTemperature/:celcius", async(req, res)=>{
        const celcius = req.params.celcius;
        const newTemp = new TemperatureModel(celcius);
        await newTemp.save();
        console.log("good job");
        res.status(200).json({message: "successfully Created record"});
});

export {router as temperatureRouter}