// dotenv
require("dotenv").config();

// modules
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");


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

// routing
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(routes);

// database
require("./config/database");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
