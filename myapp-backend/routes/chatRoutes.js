const express = require('express');
const router = express.Router();
const chatHandler = require('../controllers/chatController');

router.post('/', chatHandler.sendMessage);
router.get('/:senderId/:receiverId', chatHandler.getMessages);

module.exports = router;
