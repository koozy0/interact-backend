const express = require('express');
const controllers = require('../controllers/auth');
const invalidMethod = require('../controllers/invalid-method');
const middlewares = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(controllers.authUser)
  .all(invalidMethod);

router
  .route('/user')
  .get(middlewares.authenticate, controllers.loadUser)
  .all(invalidMethod);

module.exports = router;
