const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const port = process.env.PORT || 8000;
app.use(cors());

app.use(express.json());

app.use(morgan("default"));

app.use(errorHandler);

app.use("/", require("./Routes/PhaseRoute"));

connectDb();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
