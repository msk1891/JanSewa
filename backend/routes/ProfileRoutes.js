// routes/ProfileRoutes.js
const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// GET profile by email (or you can use ID)
router.get('/:email', async (req, res) => {
  try {
    const profile = await Profile.findOne({ email: req.params.email });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create or update profile
router.post('/', async (req, res) => {
  const { name, email, location, role } = req.body;
  try {
    let profile = await Profile.findOne({ email });
    if (profile) {
      profile.name = name;
      profile.location = location;
      profile.role = role;
    } else {
      profile = new Profile({ name, email, location, role });
    }
    await profile.save();
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
