import express from 'express';
import { SensorDataModel } from '../model/SensorDataModel.js';
const router = express.Router();

// Endpoint to handle IoT device data
router.post('/api/data', async (req, res) => {
  try {
    const { temperature, humidity, voltage } = req.body;

    // Validate input
    if (temperature === undefined || humidity === undefined || voltage === undefined) {
      return res.status(400).json({ 
        message: 'All fields (temperature, humidity, voltage) are required' 
      });
    }

    const t = parseFloat(temperature);
    const h = parseFloat(humidity);
    const v = parseFloat(voltage);

    if (isNaN(t) || isNaN(h) || isNaN(v)) {
      return res.status(400).json({ 
        message: 'Invalid sensor values. All values must be numbers' 
      });
    }

    // Create new sensor data document
    const newData = new SensorDataModel({
      t,
      h,
      v
    });

    await newData.save();

    res.status(201).json({
      success: true,
      data: {
        t,
        h,
        v,
        timestamp: newData.timestamp
      }
    });

  } catch (err) {
    console.error('Failed to save sensor data:', err);
    res.status(500).json({ 
      success: false,
      message: 'Failed to save sensor data',
      error: err.message 
    });
  }
});

// Optional: Add endpoint to fetch sensor data
router.get('/api/data', async (req, res) => {
  try {
    const data = await SensorDataModel.find().sort({ timestamp: -1 }).limit(100);
    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (err) {
    console.error('Failed to fetch sensor data:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sensor data'
    });
  }
});

export { router as sensorRouter };