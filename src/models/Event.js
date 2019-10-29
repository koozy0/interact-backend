const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require('./Question');

const EventSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    name: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: true,
    },

    start: {
      type: Date,
      required: true,
    },

    end: {
      type: Date,
      required: true,
    },

    code: {
      type: String,
      match: /^[\w\d]+$/,
      minlength: 5,
      maxlength: 20,
      unique: true,
      required: true,
    },

    questions: [Question.schema],

    highlights: {
      type: [Question.schema],
    },
  },
  { timestamps: true },
);

module.exports = Event = mongoose.model('Event', EventSchema);
