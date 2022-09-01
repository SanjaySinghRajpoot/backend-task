const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use("/DataStore", express.static(__dirname + "/DataStore"));
app.use(express.json());
app.use(cors());

const url = "mongodb+srv://buddy123:buddy123@cluster0.b7pep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// Connecting to Mongo DB Atlas
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));