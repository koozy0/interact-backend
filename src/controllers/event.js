const Event = require('../models/Event');

const search = async (req, res, next) => {
  const { q } = req.query;

  try {
    // Search for Event(s) where Event.code matches the given regex
    const events = await Event.find({ code: new RegExp(q, 'i') });

    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    // Find Event(s) and sort by 'createdAt' in descending order
    // populate the createdBy field with name and username as well
    const events = await Event.find()
      .sort({ field: 'createdAt', test: -1 })
      .populate('createdBy', 'name username');

    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  const { code } = req.params;

  try {
    // Find an Event where Event.code matches the given event code
    const event = await Event.findOne({ code });

    // Return HTTP 404 error if a matching Event is not found
    if (!event) {
      return res
        .status(404)
        .json({ msg: `Event with code: "${code}" was not found` });
    }

    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

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

const updateOne = async (req, res, next) => {};

const deleteOne = async (req, res, next) => {};

module.exports = {
  search,
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
