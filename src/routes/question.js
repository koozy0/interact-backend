const express = require('express');
const controllers = require('../controllers/question');

const questionRouter = express.Router({ mergeParams: true });

questionRouter.route('/').post(controllers.createOne);

questionRouter
  .route('/:questionId')
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

module.exports = questionRouter;
