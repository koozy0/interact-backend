const express = require('express');
const controllers = require('../controllers/user');

const userRouter = express.Router();

userRouter.route('/').post(controllers.createOne);

userRouter
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

module.exports = userRouter;
