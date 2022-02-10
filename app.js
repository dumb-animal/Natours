const express = require('express');
const morgan = require('morgan');

const routesConfig = require('./configs/routesConfig');
const toursRouter = require('./routes/toursRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();

// MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev')); // Logger
}

app.use(express.json()); // JSON parser
app.use(express.static(`${__dirname}/public`)); // Static files

// ROUTES
app.use(routesConfig.api, toursRouter);
app.use(routesConfig.api, usersRouter);

module.exports = app;
