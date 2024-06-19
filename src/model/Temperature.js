import mongoose from 'mongoose';

const TemperatureSchema = new mongoose.Schema({
  celcius: { type: Number, required: true },
  time: { type: Date, default: Date.now },
});

export const TemperatureModel = mongoose.model('Temperature', TemperatureSchema);
