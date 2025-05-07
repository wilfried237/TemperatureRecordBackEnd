// model/Humidity.js
import mongoose from 'mongoose';

const humiditySchema = new mongoose.Schema({
  percentage: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export const HumidityModel = mongoose.model('Humidity', humiditySchema);