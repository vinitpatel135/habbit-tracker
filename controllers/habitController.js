const Habit = require('../models/Habit');

// Create Habit
exports.createHabit = async (req, res) => {
  try {
    const { title, frequency } = req.body;
    const habit = new Habit({ title, frequency, user: req.user.id });
    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Habits
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Habit
exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Habit
exports.deleteHabit = async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
