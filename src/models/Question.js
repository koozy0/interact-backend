const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },

    author: {
      type: String,
      maxlength: 50,
      default: 'Anonymous',
    },

    question: {
      type: String,
      maxlength: 255,
      required: true,
    },

    upvotes: {
      type: Number,
      min: 0,
      default: 0,
    },

    downvotes: {
      type: Number,
      min: 0,
      default: 0,
    },

    highlighted: {
      type: Boolean,
      default: false,
    },

    popularity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

QuestionSchema.pre('save', function(next) {
  this.popularity = this.upvotes - this.downvotes;
  next();
});

module.exports = Question = mongoose.model('Question', QuestionSchema);
