const express = require('express');
const routes = express.Router();
const authRoutes = require('./api/auth.route');

// Routes
routes.use('/', authRoutes);

module.exports = routes;
