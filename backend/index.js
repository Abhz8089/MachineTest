import express from 'express';
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
import cors from "cors";
import connectDB from "./config/config.js";
import cookieParser from "cookie-parser";
import path from 'path';

const app = express();

//====route==
import privateRoutes from './Routes/privateRoutes.js';


//====db==
connectDB()
//dirname configuration
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename); 

app.use(express.json())

app.use(cors({ origin: process.env.FRONT_END_URL, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// const buildPath = path.join(__dirname, "../frontend/dist");
// app.use(express.static(buildPath));

app.use('/',privateRoutes);

// app.get("/*", function (req, res) {
//   const indexPath = path.join(buildPath, "index.html");

//   console.log("Index HTML Path:", indexPath);

//   res.sendFile(indexPath, function (err) {
//     if (err) {
//       console.error("Error sending index.html:", err);
//       res.status(500).send(err);
//     } else {
//       console.log("Index.html sentuccessfully");
//     }
//   });
// });

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})