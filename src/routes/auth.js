const express = require('express');
const controllers = require('../controllers/auth');
const authenticate = require('../middlewares/auth');

const authRouter = express.Router();

authRouter.route('/').post(controllers.authUser);
authRouter.route('/user').get(authenticate, controllers.getUserPrivate);

module.exports = authRouter;
