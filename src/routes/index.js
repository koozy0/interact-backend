const express = require('express');
const authRouter = require('./auth');
const eventRouter = require('./event');
const questionRouter = require('./question');
const userRouter = require('./user');
const invalidMethod = require('../controllers/invalid-method');

const router = express.Router();

router
  .route('/')
  .get((req, res) => res.json({ msg: 'interact backend  works!' }))
  .all(invalidMethod);

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/events', eventRouter);
router.use(questionRouter);

router.route('*').get((req, res) => res.sendStatus(404));

module.exports = router;
