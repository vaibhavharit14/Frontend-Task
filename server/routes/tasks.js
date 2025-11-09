const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');

// ✅ JWT Middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'Token missing. Please login again.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded = { userId: ... }
    next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    return res.status(400).json({ message: 'Invalid token. Please login again.' });
  }
};

//
// ✅ CREATE Task
//
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required.' });

    const task = new Task({
      title,
      description,
      status: status || 'Pending',
      dueDate,
      completed: false,
      user: req.user.userId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Task creation error:', err);
    res.status(500).json({ message: 'Server error. Unable to create task.' });
  }
});

//
// ✅ READ All Tasks
//
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
  } catch (err) {
    console.error('Fetch all tasks error:', err);
    res.status(500).json({ message: 'Server error. Unable to fetch tasks.' });
  }
});

//
// ✅ READ Single Task by ID
//
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    res.json(task);
  } catch (err) {
    console.error('Fetch single task error:', err);
    res.status(500).json({ message: 'Server error. Unable to fetch task.' });
  }
});

//
// ✅ UPDATE Task
//
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, status, dueDate, completed } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { title, description, status, dueDate, completed },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found.' });
    res.json(task);
  } catch (err) {
    console.error('Update task error:', err);
    res.status(500).json({ message: 'Server error. Unable to update task.' });
  }
});

//
// ✅ DELETE Task
//
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found.' });

    res.json({ message: 'Task deleted successfully.' });
  } catch (err) {
    console.error('Delete task error:', err);
    res.status(500).json({ message: 'Server error. Unable to delete task.' });
  }
});

module.exports = router;