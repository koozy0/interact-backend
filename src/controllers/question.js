const Question = require('../models/Question');

const getAll = async (req, res, next) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  const { author, question } = req.body;

  const newQuestion = new Question({
    ...(author && { author }),
    question,
  });

  try {
    const question = await newQuestion.save();
    res.status(201).json(question);
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
