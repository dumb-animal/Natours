const express = require('express');
const morgan = require('morgan');

const toursRouter = require('./routes/toursRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();

// MIDDLEWARE
app.use(morgan('dev')); // Logger
app.use(express.json()); // JSON parser

// ROUTES
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
