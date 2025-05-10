const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// POST /api/complaints - Create new complaint
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const newComplaint = new Complaint({ title, description });
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully', complaint: newComplaint });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
