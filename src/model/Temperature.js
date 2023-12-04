import mongoose from "mongoose"

const TemperatureSchema = new mongoose.Schema({
    celcius: {type: Number, required: true},
    fahrenheit: {type: Number, float:true, required: true},
    time: {type:Date,  default: Date.now},
    userOwner: {type: mongoose.Schema.Types.ObjectId, ref:"Users", required: true}
});

export const TemperatureModel = mongoose.model("Temperature", TemperatureSchema);