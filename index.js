import express from "express";
import cors from "cors";
import 'dotenv/config';
// import cookieParser from "cookie-parser";
import connectDb from "./config/mongoDB.js";
import audioUploadRouter from "./routes/audioRoutes.js";
import geminiPrompting from "./gemini/promptGemini.js";


const app = express();

const port = process.env.PORT || 4000;
connectDb();

// You could prompt anything to this function. You could give the audio transcript + prompt here to this function. 
// geminiPrompting("Hello, how are you?");

const allowedOrigins = ['http://localhost:5173','http://localhost:3000']

app.use(express.json());
// app.use(cookieParser());
app.use(cors({origin: allowedOrigins}));





app.get('/',(req, res)=> res.send("APi working"));



app.use('/api',audioUploadRouter);




app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
    });


