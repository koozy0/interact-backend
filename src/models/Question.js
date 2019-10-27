const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  author: {
    type: String,
    default: 'Anonymous',
  },

  question: {
    type: String,
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
});

module.exports = Question = mongoose.model('question', QuestionSchema);
