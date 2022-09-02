import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { langConverter, storeFile } from "./controllers/task.js";
import user from "./routes/user.js";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use("/DataStore", express.static(__dirname + "/DataStore"));
app.use(express.json());
app.use(cors());


// routes
app.get("/langconvert", langConverter);
app.get("/export", storeFile);
app.get("/user", user);


// Connecting to Mongo DB Atlas
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log(`Server Running on Port: http://localhost:${port}`)))
  .catch((error) => console.log(`${error} did not connect`));