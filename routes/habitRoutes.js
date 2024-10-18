const express = require('express');
const router = express.Router();
const { createHabit, getHabits, updateHabit, deleteHabit } = require('../controllers/habitController');
// const authMiddleware = require('../middleware/authMiddleware');
// router.use(authMiddleware);
router.post('/', createHabit);
router.get('/', getHabits);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);
// router.get('/', (req, res) => {
//     res.send('Habits endpoint working!');
//   });
module.exports = router;
