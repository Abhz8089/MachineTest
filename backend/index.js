import express from 'express';
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
import cors from "cors";
import connectDB from "./config/config.js";
import cookieParser from "cookie-parser";

const app = express();

//====route==
import privateRoutes from './Routes/privateRoutes.js';


//====db==
connectDB()

app.use(express.json())

app.use(cors({ origin: process.env.FRONT_END_URL, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/',privateRoutes);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})