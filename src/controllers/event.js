const Event = require('../models/Event');

const search = async (req, res, next) => {
  const { q } = req.query;
  const regex = new RegExp(q, 'i');

  try {
    const events = await Event.find({ code: regex });
    res.json(events);
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  const id = req.params.id;

  try {
    const event = await Event.findById(id);
    res.json(event);
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  const { createdBy, name, start, end, code } = req.body;

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
