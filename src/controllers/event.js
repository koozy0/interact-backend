const Event = require('../models/Event');

const createOne = async (req, res, next) => {
  const { createdBy, name, start, end, code } = req.body;

  // Craete new Event
  const newEvent = new Event({ createdBy, name, start, end, code });

  try {
    const event = await newEvent.save();

    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, next) => {};

const getAll = async (req, res, next) => {
  const { eventcode: code } = req.query;

  try {
    // Find Event(s) and sort by 'createdAt' in descending order
    // populate the createdBy field with name and username as well
    const events = await Event.find({
      ...(code && { code }),
    })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name username');

    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  const { eventcode: code } = req.params;

  try {
    // Find an Event where Event.code matches the given event code
    const event = await Event.findOne({ code });

    // Return HTTP 404 error if a matching Event is not found
    if (!event) {
      const message = `Event with code: "${code}" was not found`;
      const status = 404;
      return res.status(status).json({ message, status });
    }

    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {};

module.exports = {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
};
