const express = require('express');
const controllers = require('../controllers/event');
const auth = require('../middlewares/auth');
const invalidMethod = require('../controllers/invalid-method');

const router = express.Router();

router
  .route('/')
  .get(auth.authenticate, auth.isAdmin, controllers.getAll)
  .post(auth.authenticate, auth.isAdmin, controllers.createOne)
  .all(invalidMethod);

router.route('/search').get(controllers.search);

router
  .route('/:eventCode')
  .get(controllers.getOne)
  .put(auth.authenticate, auth.isAdmin, controllers.updateOne)
  .delete(auth.authenticate, auth.isAdmin, controllers.deleteOne)
  .all(invalidMethod);

module.exports = router;
