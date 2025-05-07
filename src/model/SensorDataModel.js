// models/SensorData.js
import mongoose from 'mongoose';

const sensorDataSchema = new mongoose.Schema({
  t: {  // temperature
    type: Number,
    required: true
  },
  h: {  // humidity
    type: Number,
    required: true
  },
  v: {  // voltage
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export const SensorDataModel = mongoose.model('SensorData', sensorDataSchema);