const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/ComplaintRoutes');
const farmerHelpRoutes = require('./routes/FarmerHelpRoutes');
const grievanceMapRoutes = require('./routes/GrievanceMapRoutes');
const profileRoutes = require('./routes/ProfileRoutes');

// Configure dotenv with the correct path to .env file
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Routes setup
app.use('/api/auth', authRoutes);            // Auth Routes
app.use('/api/complaints', complaintRoutes);  // Complaints Routes
app.use('/api/farmer', farmerHelpRoutes);    // Farmer Help Routes
app.use('/api/grievances', grievanceMapRoutes); // Grievance Map Routes
app.use('/api/profile', profileRoutes);      // Profile Routes

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

// Default route (optional, can be used for root testing)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
