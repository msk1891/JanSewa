const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Assuming you have a User model

// Route to get user profile data
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;  // Assuming you have authentication middleware
    const user = await User.findById(userId).select('name email location role');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
