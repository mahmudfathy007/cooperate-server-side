const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/error');
const routes = require('./routes/index');

const app = express();

// set security HTTP headers
app.use(helmet());

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: true }));

// parse json request body
app.use(bodyParser.json());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// allow cors
app.use(cors());
app.options('*', cors());

// api route
app.use('/api', routes);

// error handler
app.use(errorHandler);

module.exports = app;
