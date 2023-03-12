const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const proposalController = require('../../controllers/proposal.controller');

const proposalRoutes = express.Router();

// @route   PUT api/proposal/:userId
// @desc    send a proposal to client 
// @access  Private
// @auth    Freelancer
proposalRoutes.post('/:userId', proposalController.sendProposal);

proposalRoutes.get('/:userId', proposalController.getClientProposals);
// @route   PUT api/proposal
// @desc    decline Proposal 
// @access  Private
// @auth    Client
proposalRoutes.put('/', proposalController.declineProposal);

module.exports = proposalRoutes;
