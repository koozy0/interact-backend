const express = require('express');
const controllers = require('../controllers/user');
const invalidMethod = require('../controllers/invalid-method');

const userRouter = express.Router();

userRouter
  .route('/')
  .post(controllers.createOne)
  .all(invalidMethod);

userRouter
  .route('/:userId')
  .put(controllers.updateOne)
  .delete(controllers.deleteOne)
  .all(invalidMethod);

module.exports = userRouter;
