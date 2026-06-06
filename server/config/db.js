const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    console.warn('WARNING: Running backend server without active MongoDB connection. API endpoints requiring database access will error, but the application remains running for frontend exploration.');
  }
};

module.exports = connectDB;
