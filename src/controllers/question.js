const Question = require('../models/Question');
const Event = require('../models/Event');

const createOne = async (req, res, next) => {
  const { eventCode: code } = req.params;
  const { author, question } = req.body;

  const newQuestion = new Question({
    ...(author && { author }),
    question,
  });

  try {
    const event = await Event.findOne({ code });
    event.questions.push(newQuestion);
    const updatedEvent = await event.save();
    res.status(201).json(updatedEvent);
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {};

const deleteOne = async (req, res, next) => {};

module.exports = {
  createOne,
  updateOne,
  deleteOne,
};
