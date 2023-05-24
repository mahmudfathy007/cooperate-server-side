const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const proposalController = require('../../controllers/proposal.controller');

const proposalRoutes = express.Router();

// Send Proposal route
// @route   POST api/proposal/:userId
// @desc    Send a proposal to a client
// @access  Private
// @auth    Freelancer
proposalRoutes.post('/:userId', authenticate, authorization('freelancer'), proposalController.sendProposal);

// Get Client Proposals route
// @route   GET api/proposal/:userId
// @desc    Get proposals for a client
// @access  Public
proposalRoutes.get('/:userId', authenticate, proposalController.getClientProposals);

// Decline Proposal route
// @route   PUT api/proposal
// @desc    Decline a proposal
// @access  Private
// @auth    Client
proposalRoutes.put('/', authenticate, authorization('client'), proposalController.declineProposal);

module.exports = proposalRoutes;
