const express = require('express');
const routes = express.Router();
const authRoutes = require('./api/auth.route');
const userRoutes = require('./api/user.route');

// Routes
routes.use('/', authRoutes);
routes.use('/user', userRoutes);

module.exports = routes;
