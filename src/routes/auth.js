const express = require('express');
const controllers = require('../controllers/auth');
const invalidMethod = require('../controllers/invalid-method');

const router = express.Router();

router
  .route('/')
  .post(controllers.authUser)
  .all(invalidMethod);

module.exports = router;
