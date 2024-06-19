import express from 'express';
import { TemperatureModel } from '../models/Temperature.js';

const router = express.Router();

router.post('/createTemperature/:celcius', async (req, res) => {
  const celcius = parseFloat(req.params.celcius);  // Ensure celcius is a float

  if (isNaN(celcius)) {
    return res.status(400).json({ message: 'Invalid temperature value' });
  }

  const newTemp = new TemperatureModel({ celcius });
  try {
    await newTemp.save();
    console.log('good job');
    res.status(200).json({ message: 'Successfully created record' });
  } catch (err) {
    console.error('Failed to create record', err);
    res.status(500).json({ message: 'Failed to create record' });
  }
});

export default router;
