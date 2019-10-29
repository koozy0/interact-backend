const express = require('express');
const controllers = require('../controllers/event');
const auth = require('../middlewares/auth');
const questionRouter = require('./question');

const eventRouter = express.Router();

eventRouter
  .route('/')
  .get(auth.authenticate, auth.isAdmin, controllers.getAll)
  .post(auth.authenticate, auth.isAdmin, controllers.createOne);

eventRouter.route('/search').get(controllers.search);

eventRouter
  .route('/:eventCode')
  .get(controllers.getOne)
  .put(auth.authenticate, auth.isAdmin, controllers.updateOne)
  .delete(auth.authenticate, auth.isAdmin, controllers.deleteOne);

eventRouter.use('/:eventCode/questions', questionRouter);

module.exports = eventRouter;
