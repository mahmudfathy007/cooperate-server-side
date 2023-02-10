const express = require('express');
const routes = express.Router();
const authRoutes = require('./api/auth.route');

routes.get('/', (_req, res, next) => {
  res.status(200);
  res.json({ message: 'Main Route' });
});
// Routes
routes.use('/', authRoutes);

module.exports = routes;
