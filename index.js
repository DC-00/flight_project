require("dotenv").config();

const express = require("express");
const server = express();

const morgan = require("morgan");
server.use(morgan("dev"));

const bodyParser = require("body-parser");
server.use(bodyParser.json());

server.use("/api", require("./routes"));

const { client } = require("./database");

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Hello from port ${PORT}!`);

  try {
    await client.connect();

    console.log("We're up and running");
  } catch (error) {
    console.error("Woops\n", error);
  }
});
