import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./src/routes/users.js";
import { temperatureRouter } from "./src/routes/temperature.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/User",userRouter);
app.use("/Temperature",temperatureRouter);

mongoose.connect(process.env.REACT_APP_MONGOOSE_URL);

app.listen(process.env.PORT || 3001, ()=>console.log("server started"));