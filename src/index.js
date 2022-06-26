// modules
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");

// dotenv
require("dotenv").config();

// routes
const routes = require("./apis/routes");

// config
const port = process.env.PORT || 3001;
const app = express();

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger("short"));
app.use(routes);

// database
require("./database");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
