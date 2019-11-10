const express = require('express');
const controllers = require('../controllers/question');
const invalidMethod = require('../controllers/invalid-method');

const router = express.Router({ mergeParams: true });

router
  .route('/events/:eventcode/questions')
  .get(controllers.getAll)
  .post(controllers.createOne)
  .all(invalidMethod);

router
  .route('/questions/:id')
  .put(controllers.updateOne)
  .delete(controllers.deleteOne)
  .all(invalidMethod);

module.exports = router;
