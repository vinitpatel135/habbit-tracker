const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors')
const cron = require('node-cron');
const sendReminderEmail = require('./config/email');
const User = require('./models/User');
const Habit = require('./models/Habit');
const authMiddleware = require('./middleware/authMiddleware');
// const habitRoutes = require('./routes/habitRoutes')
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors())

connectDB();



app.use('/api/auth',  require('./routes/authRoutes'));
app.use('/api/habits', authMiddleware, require('./routes/habitRoutes'));
app.use('/api/admin', authMiddleware, require('./routes/adminRoutes'));


// Cron job for sending daily reminder at 9 AM
cron.schedule('0 9 * * *', async () => {
  try {
    // Get all users and their habits (you can customize this logic)
    const users = await User.find();
    for (let user of users) {
      const habits = await Habit.find({ user: user._id });
      if (habits.length > 0) {
        let habitTitles = habits.map(habit => habit.title).join(', ');

        // Send email notification
        const message = `Hello ${user.name}, here are your habits to complete today: ${habitTitles}`;
        sendReminderEmail(user.email, 'Daily Habit Reminder', message);
      }
    }

    console.log('Daily reminders sent at 9 AM');
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});


// Connect to DB

// Routes


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
