const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const {readdirSync} = require('fs');
require("dotenv").config();

const app = express();
const PORT =  7001;

// Middleware
app.use(express.json());
app.use(cors());

//routes
readdirSync("./routes").map((route) => {
  app.use('/api/v1', require('./routes/' + route));
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

server();
