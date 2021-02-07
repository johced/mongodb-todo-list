const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 34,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Tododb = mongoose.model('tododb', schema);

module.exports = Tododb;
