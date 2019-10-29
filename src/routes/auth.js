const express = require('express');
const controllers = require('../controllers/auth');
const auth = require('../middlewares/auth');

const authRouter = express.Router();

authRouter.route('/').post(controllers.authUser);
authRouter.route('/user').get(auth.authenticate, controllers.getUserPrivate);

module.exports = authRouter;
