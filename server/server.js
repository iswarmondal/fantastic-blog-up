import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import blogPosts from "./routes/blogPosts.routes.js";

const app = express();

app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors())

const PORT = process.env.PORT || 5050;

mongoose.connect(
    process.env.DB_CONNECTION,
)
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server is running at the port ${PORT}`);
        })
    })
    .catch(err => console.error("unable to connect to db\n" + err))