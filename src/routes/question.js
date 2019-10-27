const express = require('express');
const controllers = require('../controllers/question');

const questionRouter = express.Router();

questionRouter
  .route('/')
  .get(controllers.getAll)
  .post(controllers.createOne);

questionRouter
  .route('/:id')
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

module.exports = questionRouter;
