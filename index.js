import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {temperatureRouter} from './src/routes/temperature.js';

dotenv.config();

const app = express();

app.use(express.json());  // for parsing application/json

app.use('/Temperature', temperatureRouter);

mongoose.connect(process.env.REACT_APP_MONGOOSE_URL).then(
    ()=>{
    app.listen(process.env.PORT || 3001, ()=> console.log('server started')); 

    }
).catch((error)=>{
    console.error(error);
});  
