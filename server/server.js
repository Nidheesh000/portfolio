const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const User = require('./models/User');

// Load environment variables from the root folder
const rootEnvPath = path.resolve(__dirname, '../.env');
const localEnvPath = path.resolve(__dirname, '.env');

if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
} else if (fs.existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath });
} else {
  dotenv.config(); // fall back to standard lookup
}

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static upload folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes API mount
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Serve Frontend in Production Mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'client', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Error middleware handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Seed admin user on start if user collection is empty
const seedAdminUser = async () => {
  try {
    const adminCount = await User.countDocuments();
    if (adminCount === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'adminpassword123';
      
      const defaultAdmin = new User({
        username,
        password,
      });
      
      await defaultAdmin.save();
      console.log(`--------------------------------------------------`);
      console.log(`[SEED] Default Admin account created:`);
      console.log(`Username: ${username}`);
      console.log(`Password: ${password}`);
      console.log(`Please change these credentials in your .env file!`);
      console.log(`--------------------------------------------------`);
    }
  } catch (error) {
    console.error(`Failed to seed default admin user: ${error.message}`);
  }
};

app.listen(PORT, async () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  await seedAdminUser();
});
