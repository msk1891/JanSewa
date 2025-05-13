const express = require('express');
const Profile = require('../models/Profile'); 
const router = express.Router();

// GET request to fetch user profile by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await Profile.findById(req.params.id); // Find user by ID
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.json(user); // Return user data
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// POST request to create/update user profile
router.post('/', async (req, res) => {
  try {
    const { name, email, location, role } = req.body;
    const newUser = new Profile({
      name,
      email,
      location,
      role,
    });
    await newUser.save();
    res.status(201).json(newUser); // Send back the newly created profile
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error creating user profile' });
  }
});

module.exports = router;
