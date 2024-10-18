const express = require('express');
const router = express.Router();
const { getAllUsers, createHabitTemplate } = require('../controllers/adminController');
// const authMiddleware = require('../middleware/authMiddleware');
// router.use(authMiddleware);
router.get('/users', getAllUsers);
router.post('/habit-template', createHabitTemplate);
module.exports = router;
