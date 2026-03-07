const { Router } = require('express');
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/auth');
const messageRouter = Router();

messageRouter.get('/', messageController.getAllMessages);
messageRouter.post('/messages', authMiddleware.requireAuth, messageController.addNewMessage);
messageRouter.get('/messages/new', authMiddleware.requireAuth, messageController.getNewMessageForm);
messageRouter.delete('/messages/:id', authMiddleware.requireAdmin, messageController.deleteMessageById);

module.exports = messageRouter;