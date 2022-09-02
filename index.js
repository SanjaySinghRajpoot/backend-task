import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { langConverter, storeFile } from "./controllers/task.js";
import user from "./routes/user.js";

const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
// app.use("/DataStore", express.static(__dirname + "/DataStore"));
app.use(express.json());
app.use(cors());

const url = "mongodb+srv://buddy123:buddy123@cluster0.b7pep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


// user routes
app.get("/langconvert", langConverter);
app.get("/export", storeFile);
app.get("/user", user);




app.listen(port, () => {
    console.log(`Server is listening at port : ${port}`);
  });


// Connecting to Mongo DB Atlas
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log(`Server Running on Port: http://localhost:${port}`)))
  .catch((error) => console.log(`${error} did not connect`));