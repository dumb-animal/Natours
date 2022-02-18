// MODULES
const express = require("express");
const morgan = require("morgan");

// CONFIGS
const serverConfig = require("./configs/server.config");
const routesConfig = require("./configs/routes.config");
const errorsConfig = require("./configs/errors.config");

// ROUTERS
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");

// UTILS
const errorHandler = require("./utils/errorHandler");

const app = express();

const NODE_ENV = serverConfig.NODE_ENV || "development";

// MIDDLEWARE
if (NODE_ENV === "development") app.use(morgan("dev")); // Logger
app.use(express.json()); // JSON parser
app.use(express.urlencoded({ extended: false })); // x-www-form-urlencoded
app.use(express.static(`${__dirname}/public`)); // Static files

// ROUTES
app.use(routesConfig.tour, tourRouter);
app.use(routesConfig.user, userRouter);
app.all(routesConfig.any, (req, res, next) => next(errorsConfig.routeNotFound));

// ERROR HANDLER
app.use(errorHandler);

module.exports = app;
