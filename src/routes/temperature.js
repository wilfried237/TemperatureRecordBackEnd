import express from 'express';
import { TemperatureModel } from '../model/Temperature.js';
import { HumidityModel } from '../model/Humidity.js'; // You'll need to create this model

const router = express.Router();

// New endpoint to handle both temperature and humidity from IoT device
router.post('/api/data', async (req, res) => {
  try {
    const { temperature, humidity } = req.body;

    // Validate input
    if (temperature === undefined || humidity === undefined) {
      return res.status(400).json({ message: 'Both temperature and humidity are required' });
    }

    const tempFloat = parseFloat(temperature);
    const humFloat = parseFloat(humidity);

    if (isNaN(tempFloat) || isNaN(humFloat)) {
      return res.status(400).json({ message: 'Invalid temperature or humidity value' });
    }

    // Save temperature
    const newTemp = new TemperatureModel({ celcius: tempFloat });
    await newTemp.save();

    // Save humidity (you'll need to create HumidityModel)
    const newHum = new HumidityModel({ percentage: humFloat });
    await newHum.save();

    console.log('Data saved successfully');
    res.status(200).json({ 
      message: 'Successfully created records',
      temperature: tempFloat,
      humidity: humFloat
    });
  } catch (err) {
    console.error('Failed to create records', err);
    res.status(500).json({ message: 'Failed to create records' });
  }
});

// Keep your existing temperature route
router.get('/createTemperature/:celcius', async (req, res) => {
  const celcius = parseFloat(req.params.celcius);

  if (isNaN(celcius)) {
    return res.status(400).json({ message: 'Invalid temperature value' });
  }

  const newTemp = new TemperatureModel({ celcius });
  try {
    await newTemp.save();
    console.log('Temperature record created');
    res.status(200).json({ message: 'Successfully created temperature record' });
  } catch (err) {
    console.error('Failed to create temperature record', err);
    res.status(500).json({ message: 'Failed to create temperature record' });
  }
});

export { router as temperatureRouter };