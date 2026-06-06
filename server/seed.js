const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables from the root folder
const rootEnvPath = path.resolve(__dirname, '../.env');
const localEnvPath = path.resolve(__dirname, '.env');

if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
} else if (fs.existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath });
} else {
  dotenv.config();
}

const Project = require('./models/Project');
const Skill = require('./models/Skill');
const User = require('./models/User');

const projectsData = [
  {
    title: 'E-Commerce Platform',
    description: 'A comprehensive online storefront with shopping cart integration, secure payments processing using Stripe, and real-time inventory management dashboards.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=60',
    technologies: ['React', 'Express', 'MongoDB', 'Node.js', 'Stripe'],
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
  },
  {
    title: 'Collaborative Chat App',
    description: 'Real-time messaging web app utilizing WebSockets. Supports multiple channels, message reactions, user profile avatars, and attachment uploads.',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&auto=format&fit=crop&q=60',
    technologies: ['React', 'Socket.io', 'Node.js', 'Express', 'CSS'],
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
  },
  {
    title: 'Task Management System',
    description: 'A kanban-board styled productivity tracker. Teams can assign items, attach task checklists, write subtasks, set deadlines, and track logs.',
    image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&auto=format&fit=crop&q=60',
    technologies: ['React', 'Redux', 'Express', 'Mongoose', 'Bootstrap'],
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
  },
];

const skillsData = [
  // Frontend
  { name: 'React.js', category: 'Frontend', proficiency: 90 },
  { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 95 },
  { name: 'Bootstrap / React-Bootstrap', category: 'Frontend', proficiency: 85 },
  { name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 95 },
  // Backend
  { name: 'Node.js', category: 'Backend', proficiency: 80 },
  { name: 'Express.js', category: 'Backend', proficiency: 85 },
  { name: 'RESTful APIs', category: 'Backend', proficiency: 90 },
  // Database
  { name: 'MongoDB / Mongoose', category: 'Database', proficiency: 80 },
  // Tools
  { name: 'Git & GitHub', category: 'Tools', proficiency: 85 },
  { name: 'Docker', category: 'Tools', proficiency: 70 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connection established for seeding...');

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    console.log('Cleared existing projects and skills...');

    // Seed admin if not exists
    const adminCount = await User.countDocuments();
    if (adminCount === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'adminpassword123';
      const admin = new User({ username, password });
      await admin.save();
      console.log('Seeded default admin account...');
    }

    // Seed projects & skills
    await Project.insertMany(projectsData);
    console.log(`Successfully seeded ${projectsData.length} projects.`);

    await Skill.insertMany(skillsData);
    console.log(`Successfully seeded ${skillsData.length} skills.`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
