const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const proposalController = require('../../controllers/proposal.controller');

const proposalRoutes = express.Router();

proposalRoutes.post('/:userId', proposalController.sendProposal);

proposalRoutes.get('/:userId', proposalController.getClientProposals);

module.exports = proposalRoutes;
