const express = require('express');
const routes = express.Router();
const authRoutes = require('./api/auth.route');
const userRoutes = require('./api/user.route');
const skillRoutes = require('./api/skill.route');

// Routes
routes.use('/', authRoutes);
routes.use('/user', userRoutes);
routes.use('/skill', skillRoutes);
module.exports = routes;
