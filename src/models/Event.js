const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true,
    },

    code: {
      type: String,
      match: /^[\w\d]+$/,
      minlength: 3,
      maxlength: 20,
      unique: true,
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
  },
  {
    timestamps: true,
  },
);

module.exports = Event = mongoose.model('Event', EventSchema);
