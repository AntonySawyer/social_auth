const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  link: String,
  status: String,
  first_login: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date,
    default: Date.now
  }
});

UserSchema.statics.findOrCreate = require("find-or-create");

module.exports = mongoose.model('User', UserSchema);