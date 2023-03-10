const express = require('express');
const routes = express.Router();
const authRoutes = require('./api/auth.route');
const userRoutes = require('./api/user.route');
const skillRoutes = require('./api/skill.route');
const categoryRoutes = require('./api/category.route');
const jobRoutes = require('./api/job.route');
const proposalRoutes = require('./api/proposal.route');
const invitationRoutes = require('./api/invitation.route');

// Routes
routes.use('/', authRoutes);
routes.use('/user', userRoutes);
routes.use('/skill', skillRoutes);
routes.use('/category', categoryRoutes);
routes.use('/job', jobRoutes);
routes.use('/proposal', proposalRoutes);
routes.use('/invitation', invitationRoutes);

module.exports = routes;
