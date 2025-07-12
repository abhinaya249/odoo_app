const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String,
  availability: [String],
  skillsOffered: [String],
  skillsWanted: [String],
  rating: { type: Number, default: 0 },
  profilePhoto: String,
  isPublic: { type: Boolean, default: true },
  feedbackCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);