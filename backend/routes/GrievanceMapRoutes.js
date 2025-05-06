// routes/GrievanceMapRoutes.js
const express = require('express');
const router = express.Router();

// Dummy data (replace with DB later)
const mockGrievances = [
  {
    title: 'Water leakage in field',
    description: 'Irrigation pipe burst near village',
    latitude: 30.3165,
    longitude: 78.0322,
  },
  {
    title: 'Fertilizer not available',
    description: 'No urea stock in nearby center',
    latitude: 30.3256,
    longitude: 78.0421,
  },
];

router.get('/', (req, res) => {
  res.json(mockGrievances);
});

module.exports = router;
