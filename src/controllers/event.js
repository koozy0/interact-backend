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
    const conditions = {
      ...(code && { code: new RegExp(code, 'i') }),
    };

    const events = await Event.find(conditions)
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name username')
      .lean();

    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};

const getOneByCode = async (req, res, next) => {
  const { eventcode: code } = req.query;

  try {
    // Find an Event where Event.code matches the given event code
    const event = await Event.findOne({
      code,
      start: { $lte: new Date() },
      end: { $gte: new Date() },
    });

    // Return HTTP 404 error if a matching Event is not found
    if (!event) {
      const message = `Event with code: "${code}" was not found or is not ready`;
      const status = 404;
      return res.status(status).json({ message, status });
    }

    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

const getOneById = async (req, res, next) => {
  try {
    // Find an Event where Event.code matches the given event code
    const event = await Event.findById(req.params.id);

    // Return HTTP 404 error if a matching Event is not found
    if (!event) {
      const message = `Event with id: "${req.params.id}" was not found`;
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
  getOneByCode,
  getOneById,
  updateOne,
};
