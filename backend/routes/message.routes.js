const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const auth = require('../middlewares/auth.middleware');

// @route   POST api/messages
// @desc    Send a message
// @access  Public
router.post('/', messageController.sendMessage);

// @route   GET api/messages
// @desc    Get all messages
// @access  Private
router.get('/', auth, messageController.getMessages);

// @route   DELETE api/messages/:id
// @desc    Delete a message
// @access  Private
router.delete('/:id', auth, messageController.deleteMessage);

module.exports = router;
