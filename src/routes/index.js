const express = require('express');
const routes = express.Router();
const authRoutes = require('./api/auth.route');
const userRoutes = require('./api/user.route');
const skillRoutes = require('./api/skill.route');
const categoryRoutes = require('./api/category.route');

// Routes
routes.use('/', authRoutes);
routes.use('/user', userRoutes);
routes.use('/skill', skillRoutes);
routes.use('/category', categoryRoutes);

module.exports = routes;
