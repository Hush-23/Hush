const express = require('express');
const conversationController = require('./conversationController')

const conversationRouter = express.Router();


// Create a conversation in the database
// localhost://3000/conversation

// Get a conversation from the database
// localhost://3000/conversation/"username"
conversationRouter.post('/convo',
  conversationController.findConversation,
  (req, res) => {
    res.status(res.locals.status).json({cid: res.locals.convoId, conversation: res.locals.messages});
  });

// Append to a conversation
// localhost://3000/conversation/"username"

// Delete a conversation
// localhost://3000/conversation/"name"

module.exports = conversationRouter;