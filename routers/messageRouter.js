const { Router } = require('express');
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/auth');
const messageRouter = Router();

messageRouter.get('/', messageController.getAllMessages);
messageRouter.post('/messages', messageController.addNewMessage);
messageRouter.get('/messages/new', messageController.getMessageForm);
messageRouter.delete('/messages/:id', messageController.deleteMessageById);

module.exports = messageRouter;