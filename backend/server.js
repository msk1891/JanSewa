const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

//import routes
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/ComplaintRoutes');
const farmerHelpRoutes = require('./routes/FarmerHelpRoutes');
const grievanceMapRoutes = require('./routes/GrievanceMapRoutes');
const profileRoutes = require('./routes/ProfileRoutes');

// Configure dotenv with the correct path to .env file
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

//use routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/farmer', farmerHelpRoutes);
app.use('/api/grievances', grievanceMapRoutes);
app.use('/api/profile', profileRoutes);


// serve uploaded images
app.use('/uploads', express.static('uploads')); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});