const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["OPEN", "IN_PROGRESS", "IN_REVIEW", "DONE"],
    required: true,
  },
  repeat_interval: {
    type: String,
    enum: ["NONE", "EVERYDAY", "EVERY_WEEKDAY", "EVERY_WEEK", "EVERY_MONTH"],
    required: true,
  },
  deadline: {
    type: Date,
    required: false,
  },
});

const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;
