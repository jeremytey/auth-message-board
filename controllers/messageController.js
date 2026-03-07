const passport = require('passport');
const bcrypt = require('bcrypt');
const message = require('../db/queries/messageQueries');

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await message.getAllMessages();
        res.render('index', { messages, user: req.user });
    } catch (err) {
        console.error(err);
        res.status(400).send('Unable to perform operation');
    }
}

exports.addNewMessage = async (req, res) => {
    const { title, body } = req.body;
    const author_id = req.user.id;
    try {
        await message.createMessage(title, body, author_id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(400).send('Unable to perform operation');
    }
}

exports.deleteMessageById = async (req, res) => {
    const messageId = req.params.id;
    try {
        const deletedMessage = await message.deleteMessage(messageId);
        if (deletedMessage) {
            res.redirect('/');
        } else {
            res.status(404).send('Message not found');
        }
    } catch (err) {
        console.error(err);
        res.status(400).send('Unable to perform operation');
    }
}
