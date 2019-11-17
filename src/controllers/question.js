const Question = require('../models/Question');

const getAll = async (req, res, next) => {
  const { event } = req.params;
  const { sort = 'popularity' } = req.query;

  // Simple validation for "sort" field
  if (!['popularity', 'createdAt'].includes(sort)) {
    const message =
      'Question(s) can only be sorted by "popularity" or "createdAt"';
    const status = 400;
    res.status(status).json({ message, status });
  }

  try {
    // Find all Question(s) where event matches the given event id
    // Sort by the specified field in descending order (default: "popularity")
    const questions = await Question.find({ event }).sort({ [sort]: -1 });

    res.status(200).json(questions);
  } catch (err) {}
};

const createOne = async (req, res, next) => {
  const { event } = req.params;
  const { author, question } = req.body;

  // Create new Question
  const newQuestion = new Question({
    event,
    question,
    ...(author && { author }),
  });

  try {
    const created = await newQuestion.save();
    // emit 'create_question' event to the event room
    res.app
      .get('io')
      .to(event)
      .emit('create_question', created);
    // respond to http request
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {};

const deleteOne = async (req, res, next) => {};

module.exports = {
  getAll,
  createOne,
  updateOne,
  deleteOne,
};
