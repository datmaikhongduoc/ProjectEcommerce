require("dotenv").config();
require("express-async-errors");
// Security
const helmet = require("helmet");
const cors = require("cors");
const xssClean = require("xss-clean");
const ratingLimit = require("express-rate-limit");
// Extension
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
// Normal
const express = require("express");
const app = express();
const notFound = require("./src/middleware/notFound.middleware");
const errorHandlerMiddleware = require("./src/middleware/errorHandler.middleware");

// ------------ Middleware ------------
// Security
app.set("trust proxy", 1);
app.use(
  ratingLimit({
    windowMs: 15 * 60 * 100, // 15 Minute
    max: 100, // Limit each IP to 100 requests per windowMs
  })
);
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(helmet());
app.use(xssClean());

// Extension
app.use(cookieParser());
app.use(compression());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Login API
// app.use("/api/users", userRouter)

require("./src/schedule");
require("./src/db/connectDB");
const { checkOverload } = require("./src/helpers/check-connect");
checkOverload();
app.use("/", require("./src/routes"));
app.use(errorHandlerMiddleware);
app.use("/**", notFound);
module.exports = app;
