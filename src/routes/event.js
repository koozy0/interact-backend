const express = require('express');
const controllers = require('../controllers/event');

const eventRouter = express.Router();

eventRouter
  .route('/')
  .get(controllers.getAll)
  .post(controllers.createOne);

eventRouter.route('/search').get(controllers.search);

eventRouter
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

module.exports = eventRouter;
