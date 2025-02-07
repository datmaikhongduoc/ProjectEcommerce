require("dotenv").config();
require("express-async-errors");
// Security
const helmet = require("helmet");
const cors = require("cors");
const ratingLimit = require("express-rate-limit");
// Extension
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
// Normal
const express = require("express");
const passport = require("passport");
// Store
const session = require("express-session");

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
    message: "So much request please try again",
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(helmet());

// Extension
app.use(cookieParser());
app.use(compression());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    // store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { httpOnly: true, maxAge: 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./src/middleware/passportGoogleSSO.middleware");
require("./src/databases/init.mongoDB");
const { checkOverload } = require("./src/helpers/check-connect");
checkOverload();
app.use("/", require("./src/routes"));
app.use(errorHandlerMiddleware);
app.use("/**", notFound);
module.exports = app;
