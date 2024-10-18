const mongoose = require('mongoose');
const habitSchema = new mongoose.Schema({
  title: String,
  frequency: String,
  streak: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
module.exports = mongoose.model('Habit', habitSchema);
