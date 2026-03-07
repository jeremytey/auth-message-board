const { Router } = require('express');
const authController = require('../controllers/authController');
const authorRouter = Router();
const authMiddleware = require('../middleware/auth');

authorRouter.get('/sign-up', authController.getSignUpForm);
authorRouter.post('/sign-up', authController.submitSignUpForm);
authorRouter.get('/login', authController.getLoginForm);
authorRouter.post('/login', authController.submitLoginForm);

authorRouter.get('/passcode/member', authMiddleware.requireAuth, authController.getMemberPasscodeForm);
authorRouter.post('/passcode/member', authMiddleware.requireAuth, authController.submitMemberPasscodeForm);
authorRouter.get('/passcode/admin', authMiddleware.requireAuth, authController.getAdminPasscodeForm);
authorRouter.post('/passcode/admin', authMiddleware.requireAuth, authController.submitAdminPasscodeForm);
authorRouter.post('/logout', authController.logout);

module.exports = authorRouter;
