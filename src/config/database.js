require("dotenv").config();
const moongose = require("mongoose");

const url = `${process.env.MONGO_URI}`;

moongose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });
