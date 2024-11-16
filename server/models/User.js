const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
  },
  firstName: {
    type: String,
    require: true,
    trim: true,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  token: {
    type: String,
  },
});

module.exports = new mongoose.model("User", userSchema);
