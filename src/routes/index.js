const express = require('express');
const eventRouter = require('./event');
const questionRouter = require('./question');
const userRouter = require('./user');

const router = express.Router();

router
  .route('/')
  .get((req, res) => res.json({ msg: 'interact backend  works!' }))
  .all((req, res) => res.sendStatus(405));

router.use('/users', userRouter);
router.use('/events', eventRouter);
router.use('/questions', questionRouter);

router.route('*').get((req, res) => res.sendStatus(404));

module.exports = router;
