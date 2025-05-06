const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage: storage });

/**
 * POST /api/farmer/price-query
 * Expects: { query: "wheat in rudraprayag" }
 */
router.post('/price-query', (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  // Mock AI response (you can replace with real model/logic)
  const price = Math.floor(1800 + Math.random() * 700); // 1800 - 2500
  res.json({ answer: `The current mandi price for ${query.toLowerCase()} is ₹${price}/quintal.` });
});

/**
 * POST /api/farmer/leaf-diagnosis
 * Accepts: image file upload
 */
router.post('/leaf-diagnosis', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Image is required' });
  }

  // Mock response
  res.json({
    diagnosis: 'Possible fungal infection. Try Neem-based organic spray.',
    filePath: req.file.path,
  });
});

module.exports = router;
