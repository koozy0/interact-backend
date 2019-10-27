const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },

    name: {
      type: String,
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
      unique: true,
      required: true,
    },

    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Question',
      },
    ],

    highlights: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Question',
        },
      ],
    },
  },
  { timestamps: true },
);

module.exports = Event = mongoose.model('event', EventSchema);
